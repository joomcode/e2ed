import {RESOLVED_PROMISE} from '../../constants/internal';
import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {isTestSkipped} from '../../hooks';

import {assertValueIsTrue} from '../asserts';
import {getTestFnWithTimeout, getTestRunEvent, registerStartTestRunEvent} from '../events';
import {getRandomId} from '../getRandomId';
import {getRelativeTestFilePath} from '../getRelativeTestFilePath';

import type {Inner} from 'testcafe-without-typecheck';

import type {
  E2edEnvironment,
  ExcludeUndefinedFromProperties,
  RunId,
  RunLabel,
  TestFn,
  TestRunState,
  TestStaticOptions,
  UtcTimeInMs,
} from '../../types/internal';

const skippedTestFn: TestFn = () => RESOLVED_PROMISE;

/**
 * Internal before test hook with TestRun state.
 * @internal
 */
export function beforeTest(
  testRunState: TestRunState,
  testController: Inner.TestController,
): asserts testRunState is ExcludeUndefinedFromProperties<TestRunState> {
  const runId = getRandomId().replace(/:/g, '-') as RunId;

  setRunId(runId);
  setRawMeta(testRunState.options.meta);

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const previousRunId = testRunState.runId;
  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: testRunState.name,
    options: testRunState.options,
  };
  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL as RunLabel;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const isSkipped = isTestSkipped(testStaticOptions);

  registerStartTestRunEvent({
    ...testStaticOptions,
    ended: false,
    isSkipped,
    logEvents: [],
    previousRunId,
    runId,
    runLabel,
    utcTimeInMs,
  });

  const testFnWithTimeout = getTestFnWithTimeout({
    runId,
    testFn: testRunState.testFn,
    testTimeout: testRunState.options.testTimeout,
  });
  const testFnClosure = isSkipped ? skippedTestFn : testFnWithTimeout;

  Object.assign<TestRunState, Partial<TestRunState>>(testRunState, {
    runId,
    testFnClosure,
  });

  if (previousRunId !== undefined) {
    const previousTestRun = getTestRunEvent(previousRunId);

    assertValueIsTrue(previousTestRun.ended, 'previousTestRun is ended', {
      previousTestRun,
      testRunState,
    });
  }
}
