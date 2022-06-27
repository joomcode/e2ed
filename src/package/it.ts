import {setRawMeta} from './context/meta';
import {getRunId, setRunId} from './context/runId';
import {assertValueIsDefined} from './utils/asserts';
import {
  getTestRunEvent,
  registerEndTestRunEvent,
  registerStartTestRunEvent,
  setTestRunTimeout,
} from './utils/events';
import {getRandomId} from './utils/getRandomId';
import {getRelativeTestFilePath} from './utils/getRelativeTestFilePath';
import {getTestRunErrors} from './utils/getTestRunErrors';
import {isTestSkipped} from './hooks';
import {fixture, test} from './testcafe';

import type {Inner} from 'testcafe-without-typecheck';

import type {
  RunId,
  RunLabel,
  TestFn,
  TestOptions,
  TestStaticOptions,
  UtcTimeInMs,
} from './types/internal';

const resolvedPromise = Promise.resolve();

const skippedTestFn: TestFn = () => resolvedPromise;

/**
 * Creates test with name, metatags, options and test function.
 */
export const it = (name: string, options: TestOptions, testFn: TestFn): void => {
  fixture(' - e2ed - ');

  let previousRunId: RunId | undefined;
  let testFnClosure: TestFn | undefined;

  test
    .before(async (testController: Inner.TestController) => {
      const runId = getRandomId().replace(/:/g, '-') as RunId;

      const {errs: originalErrors} = testController.testRun;
      const {filename: absoluteFilePath} = testController.testRun.test.testFile;
      const filePath = getRelativeTestFilePath(absoluteFilePath);
      const runLabel = process.env.E2ED_RUN_LABEL as RunLabel;
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const testStaticOptions: TestStaticOptions = {filePath, name, options};
      const runTestOwnParams = {...testStaticOptions, previousRunId, runLabel, utcTimeInMs};

      const isSkipped = isTestSkipped(testStaticOptions);

      if (previousRunId !== undefined) {
        const previousTestRun = getTestRunEvent(previousRunId);

        previousTestRun.reject('TestRun was internally retried');
      }

      previousRunId = runId;

      setRunId(runId);
      setRawMeta(options.meta);

      const {clearTimeout, reject, testFnWithReject} = setTestRunTimeout({
        runId,
        testFn,
        testTimeout: options.testTimeout,
      });

      testFnClosure = isSkipped ? skippedTestFn : testFnWithReject;

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
    })(name, () => {
      assertValueIsDefined(testFnClosure, 'testFnClosure is undefined', {previousRunId});

      return testFnClosure();
    })
    .after(async (testController: Inner.TestController) => {
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const {errs: originalErrors} = testController.testRun;
      const errors = getTestRunErrors(originalErrors);

      const runId = getRunId();

      await registerEndTestRunEvent({errors, originalErrors, runId, utcTimeInMs});
    });
};
