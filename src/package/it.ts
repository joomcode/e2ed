import {setRawMeta} from './context/meta';
import {getRunId, setRunId} from './context/runId';
import {
  forceEndTestRunEvent,
  registerEndTestRunEvent,
  registerStartTestRunEvent,
} from './utils/events';
import {getRandomId} from './utils/getRandomId';
import {getRelativeTestFilePath} from './utils/getRelativeTestFilePath';
import {getTestRunErrors} from './utils/getTestRunErrors';

import type {RunId, TestOptions, UtcTimeInMs} from './types/internal';
import type {Inner} from 'testcafe-without-typecheck';

declare const fixture: Inner.FixtureFn;
declare const test: Inner.TestFn;

/**
 * Creates test with name, metatags, options and test function.
 */
export const it = (name: string, options: TestOptions, testFn: () => Promise<void>): void => {
  fixture(' - e2ed - ');

  let previousRunId: RunId | undefined;

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
        await forceEndTestRunEvent(runId);
      }

      previousRunId = runId;

      setRunId(runId);
      setRawMeta(options.meta);

      await registerStartTestRunEvent({
        ...runTestOwnParams,
        ended: false,
        logEvents: [],
        originalErrors,
        runId,
      });
    })(name, testFn)
    .after(async (testController: Inner.TestController) => {
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const {errs: originalErrors} = testController.testRun;
      const errors = getTestRunErrors(originalErrors);

      const runId = getRunId();

      await registerEndTestRunEvent({errors, runId, utcTimeInMs}, originalErrors);
    });
};
