import {setRawMeta} from './context/meta';
import {getRunId, setRunId} from './context/runId';
import {assertValueIsDefined} from './utils/asserts';
import {
  forceEndTestRunEvent,
  registerEndTestRunEvent,
  registerStartTestRunEvent,
  setTestRunTimeout,
} from './utils/events';
import {getRandomId} from './utils/getRandomId';
import {getRelativeTestFilePath} from './utils/getRelativeTestFilePath';
import {getTestRunErrors} from './utils/getTestRunErrors';

import type {RunId, TestFn, TestOptions, UtcTimeInMs} from './types/internal';
import type {Inner} from 'testcafe-without-typecheck';

declare const fixture: Inner.FixtureFn;
declare const test: Inner.TestFn;

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
      const runLabel = process.env.E2ED_RUN_LABEL;
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const runTestOwnParams = {filePath, name, options, previousRunId, runLabel, utcTimeInMs};

      if (previousRunId !== undefined) {
        await forceEndTestRunEvent(previousRunId);
      }

      previousRunId = runId;

      setRunId(runId);
      setRawMeta(options.meta);

      const {clear, testFnWithTimeout} = setTestRunTimeout(runId, testFn);

      testFnClosure = testFnWithTimeout;

      await registerStartTestRunEvent({
        ...runTestOwnParams,
        clear,
        ended: false,
        logEvents: [],
        originalErrors,
        runId,
      });
    })(name, () => {
      assertValueIsDefined(testFnClosure);

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
