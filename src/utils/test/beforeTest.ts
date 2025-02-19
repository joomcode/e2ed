import {TestRunStatus} from '../../constants/internal';
import {setMeta} from '../../context/meta';
import {getOnResponseCallbacks} from '../../context/onResponseCallbacks';
import {setOutputDirectoryName} from '../../context/outputDirectoryName';
import {setRetryIndex} from '../../context/retryIndex';
import {setRunId} from '../../context/runId';
import {setTestIdleTimeout} from '../../context/testIdleTimeout';
import {setTestStaticOptions} from '../../context/testStaticOptions';
import {setTestTimeout} from '../../context/testTimeout';

import {getFullPackConfig} from '../config';
import {getRunLabel} from '../environment';
import {registerStartTestRunEvent} from '../events';
import {mapBackendResponseForLogs} from '../log';
import {getUserlandHooks} from '../userland';

import {getTestFnAndReject} from './getTestFnAndReject';

import type {TestRunEvent, TestUnit, UtcTimeInMs} from '../../types/internal';

import {test} from '@playwright/test';

const additionToPlaywrightTestTimeout = 500;

/**
 * Internal before test hook.
 * @internal
 */
export const beforeTest = ({
  outputDirectoryName,
  retryIndex,
  runId,
  startTimeInMs,
  testFn,
  testStaticOptions,
}: TestUnit): void => {
  const {options} = testStaticOptions;

  setMeta(options.meta);
  setOutputDirectoryName(outputDirectoryName);
  setRetryIndex(retryIndex);
  setRunId(runId);
  setTestStaticOptions(testStaticOptions);

  const onResponseCallbacks = getOnResponseCallbacks();

  onResponseCallbacks.push(mapBackendResponseForLogs);

  const {testIdleTimeout: testIdleTimeoutFromConfig, testTimeout: testTimeoutFromConfig} =
    getFullPackConfig();
  const testIdleTimeout = options.testIdleTimeout ?? testIdleTimeoutFromConfig;
  const testTimeout = options.testTimeout ?? testTimeoutFromConfig;

  test.setTimeout(testTimeout + additionToPlaywrightTestTimeout + (Date.now() - startTimeInMs));

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
    outputDirectoryName,
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
