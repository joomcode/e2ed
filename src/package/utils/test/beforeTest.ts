import {TestRunStatus} from '../../constants/internal';
import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {setTestIdleTimeout} from '../../context/testIdleTimeout';
import {setTestTimeout} from '../../context/testTimeout';

import {assertValueIsDefined} from '../asserts';
import {registerStartTestRunEvent} from '../events';
import {getFullConfig} from '../getFullConfig';
import {getRelativeTestFilePath} from '../getRelativeTestFilePath';
import {getUserlandHooks} from '../userlandHooks';

import {getTestFnAndReject} from './getTestFnAndReject';
import {processBrokenTestRuns} from './processBrokenTestRuns';

import type {
  E2edEnvironment,
  RunId,
  Test,
  TestController,
  TestRunEvent,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

type Options = Readonly<{
  previousRunId: RunId | undefined;
  runId: RunId;
  test: Test;
  testController: TestController;
}>;

/**
 * Internal before test hook with TestRun state.
 * @internal
 */
export const beforeTest = ({previousRunId, runId, test, testController}: Options): void => {
  setRunId(runId);
  setRawMeta(test.options.meta);

  const {testIdleTimeout: testIdleTimeoutFromConfig, testTimeout: testTimeoutFromConfig} =
    getFullConfig();
  const testIdleTimeout = test.options.testIdleTimeout ?? testIdleTimeoutFromConfig;
  const testTimeout = test.options.testTimeout ?? testTimeoutFromConfig;

  setTestIdleTimeout(testIdleTimeout);
  setTestTimeout(testTimeout);

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: test.name,
    options: test.options,
  };

  const {isTestSkipped} = getUserlandHooks();

  const {isSkipped, reason: skipReason} = isTestSkipped(testStaticOptions);

  if (isSkipped && !('skipReason' in test.options.meta)) {
    Object.assign(test.options.meta, {skipReason});
  }

  const {onlog, reject, testFnWithReject} = getTestFnAndReject({
    isSkipped,
    runId,
    testFn: test.testFn,
    testIdleTimeout,
    testTimeout,
  });

  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  assertValueIsDefined(runLabel, 'runLabel is defined', {runId, testStaticOptions});

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
