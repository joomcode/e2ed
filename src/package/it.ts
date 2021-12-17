import {setRawMeta} from './context/meta';
import {getRunId, setRunId} from './context/runId';
import {registerFinishTestEvent, registerRunTestEvent} from './utils/events';
import {getRandomId} from './utils/getRandomId';
import {getRelativeTestFilePath} from './utils/getRelativeTestFilePath';

import type {RunId, TestOptions, UtcTimeInMs} from './types/internal';
import type {Inner} from 'testcafe-without-typecheck';

declare const fixture: Inner.FixtureFn;
declare const test: Inner.TestFn;

/**
 * Creates test with name, metatags, options and test function.
 */
export const it = (name: string, options: TestOptions, testFn: () => Promise<void>): void => {
  fixture(' - e2ed - ');

  let lastRunId: RunId | undefined;

  test
    .before((testController: Inner.TestController) => {
      const runId = getRandomId().replace(/:/g, '-') as RunId;

      const isInternalRetryOf = lastRunId;
      const {filename: absoluteFilePath} = testController.testRun.test.testFile;
      const filePath = getRelativeTestFilePath(absoluteFilePath);
      const runLabel = process.env.E2ED_RUN_LABEL;
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const runTestOwnParams = {filePath, isInternalRetryOf, name, options, runLabel, utcTimeInMs};

      lastRunId = runId;

      setRunId(runId);
      setRawMeta(options.meta);

      return registerRunTestEvent({...runTestOwnParams, logEvents: [], runId});
    })(name, testFn)
    .after((testController: Inner.TestController) => {
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const {errs} = testController.testRun;
      const errors = errs.map(({errMsg}) => ({message: errMsg}));

      const runId = getRunId();

      return registerFinishTestEvent({errors, runId, utcTimeInMs});
    });
};
