import {setRawMeta} from '../../context/meta';
import {setRunId} from '../../context/runId';
import {isTestSkipped} from '../../hooks';

import {getTestRunEvent, registerStartTestRunEvent, setTestRunTimeout} from '../events';
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

const resolvedPromise = Promise.resolve();
const skippedTestFn: TestFn = () => resolvedPromise;

/**
 * Get internal before test hook by TestRun state.
 * @internal
 */
export const getBeforeTest =
  (testRunState: TestRunState) =>
  async (testController: Inner.TestController): Promise<void> => {
    const runId = getRandomId().replace(/:/g, '-') as RunId;

    const {errs: originalErrors} = testController.testRun;
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
      previousRunId: testRunState.previousRunId,
      runLabel,
      utcTimeInMs,
    };

    const isSkipped = isTestSkipped(testStaticOptions);

    if (testRunState.previousRunId !== undefined) {
      const previousTestRun = getTestRunEvent(testRunState.previousRunId);

      previousTestRun.reject('TestRun was internally retried');
    }

    // eslint-disable-next-line no-param-reassign
    testRunState.previousRunId = runId;

    setRunId(runId);
    setRawMeta(testRunState.options.meta);

    const {clearTimeout, reject, testFnWithReject} = setTestRunTimeout({
      runId,
      testFn: testRunState.testFn,
      testTimeout: testRunState.options.testTimeout,
    });

    // eslint-disable-next-line no-param-reassign
    testRunState.testFnClosure = isSkipped ? skippedTestFn : testFnWithReject;
    await registerStartTestRunEvent({
      ...runTestOwnParams,
      clearTimeout,
      ended: false,
      isSkipped,
      logEvents: [],
      originalErrors,
      reject,
      runId,
    });
  };
