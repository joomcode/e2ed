import {TestRunStatus} from '../../constants/internal';
import {setMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {setTestIdleTimeout} from '../../context/testIdleTimeout';
import {setTestTimeout} from '../../context/testTimeout';

import {getRunLabel} from '../environment';
import {registerStartTestRunEvent} from '../events';
import {getFullPackConfig} from '../getFullPackConfig';
import {getUserlandHooks} from '../userlandHooks';

import {getTestFnAndReject} from './getTestFnAndReject';
import {processBrokenTestRuns} from './processBrokenTestRuns';

import type {
  RunId,
  TestFn,
  TestRunEvent,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

type Options = Readonly<{
  previousRunId: RunId | undefined;
  runId: RunId;
  testFn: TestFn;
  testStaticOptions: TestStaticOptions;
}>;

/**
 * Internal before test hook.
 * @internal
 */
export const beforeTest = ({previousRunId, runId, testFn, testStaticOptions}: Options): void => {
  const {options} = testStaticOptions;

  setRunId(runId);
  setMeta(options.meta);

  const {testIdleTimeout: testIdleTimeoutFromConfig, testTimeout: testTimeoutFromConfig} =
    getFullPackConfig();
  const testIdleTimeout = options.testIdleTimeout ?? testIdleTimeoutFromConfig;
  const testTimeout = options.testTimeout ?? testTimeoutFromConfig;

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
    previousRunId,
    reject,
    runId,
    runLabel,
    status: isSkipped ? TestRunStatus.Skipped : TestRunStatus.Unknown,
    testFnWithReject,
    utcTimeInMs,
  };

  registerStartTestRunEvent(testRunEvent);

  processBrokenTestRuns(testRunEvent);
};
