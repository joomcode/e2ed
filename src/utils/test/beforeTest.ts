import {TestRunStatus} from '../../constants/internal';
import {setMeta} from '../../context/meta';
import {getOnResponseCallbacks} from '../../context/onResponseCallbacks';
import {setRetryIndex} from '../../context/retryIndex';
import {setRunId} from '../../context/runId';
import {setTestIdleTimeout} from '../../context/testIdleTimeout';
import {setTestTimeout} from '../../context/testTimeout';

import {getFullPackConfig} from '../config';
import {getRunLabel} from '../environment';
import {registerStartTestRunEvent} from '../events';
import {mapBackendResponseForLogs} from '../log';
import {getUserlandHooks} from '../userland';

import {getTestFnAndReject} from './getTestFnAndReject';

import type {
  RunId,
  TestFn,
  TestRunEvent,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

import {test} from '@playwright/test';

type Options = Readonly<{
  beforeRetryTimeout: number | undefined;
  retryIndex: number;
  runId: RunId;
  testFn: TestFn;
  testStaticOptions: TestStaticOptions;
}>;

const additionToPlaywrightTestTimeout = 500;

/**
 * Internal before test hook.
 * @internal
 */
export const beforeTest = ({
  beforeRetryTimeout,
  retryIndex,
  runId,
  testFn,
  testStaticOptions,
}: Options): void => {
  const {options} = testStaticOptions;

  setMeta(options.meta);
  setRetryIndex(retryIndex);
  setRunId(runId);

  const onResponseCallbacks = getOnResponseCallbacks();

  onResponseCallbacks.push(mapBackendResponseForLogs);

  const {testIdleTimeout: testIdleTimeoutFromConfig, testTimeout: testTimeoutFromConfig} =
    getFullPackConfig();
  const testIdleTimeout = options.testIdleTimeout ?? testIdleTimeoutFromConfig;
  const testTimeout = options.testTimeout ?? testTimeoutFromConfig;

  test.setTimeout(testTimeout + additionToPlaywrightTestTimeout + (beforeRetryTimeout ?? 0));

  setTestIdleTimeout(testIdleTimeout);
  setTestTimeout(testTimeout);

  const {isTestSkipped} = getUserlandHooks();

  const {isSkipped, reason: skipReason} = isTestSkipped(testStaticOptions);

  if (isSkipped && !('skipReason' in options.meta)) {
    Object.assign(options.meta, {skipReason});
  }

  const {onlog, reject, testFnWithReject} = getTestFnAndReject({
    isSkipped,
    runId,
    testFn,
    testIdleTimeout,
    testTimeout,
  });

  const runLabel = getRunLabel();
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const testRunEvent: TestRunEvent = {
    ...testStaticOptions,
    logEvents: [],
    onlog,
    reject,
    retryIndex,
    runId,
    runLabel,
    status: isSkipped ? TestRunStatus.Skipped : TestRunStatus.Unknown,
    testFnWithReject,
    utcTimeInMs,
  };

  registerStartTestRunEvent(testRunEvent);
};
