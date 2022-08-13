import {TestRunStatus} from '../../constants/internal';
import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {isTestSkipped} from '../../hooks';

import {registerStartTestRunEvent} from '../events';
import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import {getTestFnAndReject} from './getTestFnAndReject';
import {processBrokenTestRuns} from './processBrokenTestRuns';

import type {
  E2edEnvironment,
  RunId,
  RunLabel,
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

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: test.name,
    options: test.options,
  };
  const {isSkipped, reason: skipReason} = isTestSkipped(testStaticOptions);

  if (isSkipped && !('skipReason' in test.options.meta)) {
    Object.assign(test.options.meta, {skipReason});
  }

  const {onlog, reject, testFnWithReject} = getTestFnAndReject({
    isSkipped,
    runId,
    testFn: test.testFn,
    testIdleTimeout: test.options.testIdleTimeout,
    testTimeout: test.options.testTimeout,
  });

  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL as RunLabel;
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
