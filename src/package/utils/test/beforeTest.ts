import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {isTestSkipped} from '../../hooks';

import {createRunId} from '../createRunId';
import {registerStartTestRunEvent} from '../events';
import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import {getTestFnAndReject} from './getTestFnAndReject';

import type {Inner} from 'testcafe-without-typecheck';

import type {
  E2edEnvironment,
  RunLabel,
  TestRunState,
  TestRunStateWithoutReject,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Internal before test hook with TestRun state.
 * @internal
 */
export function beforeTest(
  testRunState: TestRunStateWithoutReject,
  testController: Inner.TestController,
): asserts testRunState is TestRunState {
  const runId = createRunId();

  setRunId(runId);
  setRawMeta(testRunState.options.meta);

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const {previousRunId} = testRunState;
  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: testRunState.name,
    options: testRunState.options,
  };
  const isSkipped = isTestSkipped(testStaticOptions);

  const {reject, testFnWithReject} = getTestFnAndReject({
    isSkipped,
    runId,
    testFn: testRunState.testFn,
    testTimeout: testRunState.options.testTimeout,
  });

  Object.assign<TestRunStateWithoutReject, Partial<TestRunState>>(testRunState, {
    previousRunId: runId,
    testFnWithReject,
  });

  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL as RunLabel;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  registerStartTestRunEvent({
    ...testStaticOptions,
    ended: false,
    isSkipped,
    logEvents: [],
    previousRunId,
    reject,
    runId,
    runLabel,
    utcTimeInMs,
  });
}
