/* eslint-disable no-param-reassign */

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
export const beforeTest = (
  testRunState: TestRunState,
  testController: Inner.TestController,
): void => {
  const runId = getRandomId().replace(/:/g, '-') as RunId;

  const {filename: absoluteFilePath} = testController.testRun.test.testFile;
  const filePath = getRelativeTestFilePath(absoluteFilePath);
  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL as RunLabel;
  const utcTimeInMs = Date.now() as UtcTimeInMs;

  const testStaticOptions: TestStaticOptions = {
    filePath,
    name: testRunState.name,
    options: testRunState.options,
  };
  const runTestOwnParams = {
    ...testStaticOptions,
    previousRunId: testRunState.runId,
    runLabel,
    utcTimeInMs,
  };

  const isSkipped = isTestSkipped(testStaticOptions);

  if (testRunState.runId !== undefined) {
    const previousTestRun = getTestRunEvent(testRunState.runId);

    assertValueIsTrue(previousTestRun.ended, 'previousTestRun is ended', {
      previousTestRun,
      testRunState,
    });
  }

  testRunState.error = undefined;
  testRunState.runId = runId;

  setRunId(runId);
  setRawMeta(testRunState.options.meta);

  const testFnWithTimeout = getTestFnWithTimeout({
    runId,
    testFn: testRunState.testFn,
    testTimeout: testRunState.options.testTimeout,
  });

  testRunState.testFnClosure = isSkipped ? skippedTestFn : testFnWithTimeout;

  registerStartTestRunEvent({
    ...runTestOwnParams,
    ended: false,
    isSkipped,
    logEvents: [],
    runId,
  });
};
