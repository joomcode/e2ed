import {setRawMeta} from './context/meta';
import {setRunId} from './context/runId';
import {assertValueIsDefined} from './utils/asserts';
import {getRelativeTestFilePath} from './utils/getRelativeTestFilePath';
import {registerFinishTestEvent} from './utils/registerFinishTestEvent';
import {registerRunTestEvent} from './utils/registerRunTestEvent';

import type {RunId, TestOptions, UtcTimeInMs} from './types/internal';
import type {Inner} from 'testcafe-without-typecheck';

declare const fixture: Inner.FixtureFn;
declare const test: Inner.TestFn;

/**
 * Creates test with name, metatags, options and test function.
 */
export const it = (name: string, options: TestOptions, testFn: () => Promise<void>): void => {
  fixture(' - e2ed - ');

  let runId: RunId;

  test
    .before((testController: Inner.TestController) => {
      // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
      const hooks: typeof import('./hooks') = require('./hooks');

      const {filename: absoluteFilePath} = testController.testRun.test.testFile;
      const filePath = getRelativeTestFilePath(absoluteFilePath);
      const runLabel = process.env.E2ED_RUN_LABEL;
      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const runTestOwnParams = {filePath, name, options, runLabel, utcTimeInMs};

      runId = hooks.runId(runTestOwnParams);

      setRunId(runId);
      setRawMeta(options.meta);

      return registerRunTestEvent({...runTestOwnParams, logEvents: [], runId});
    })(name, testFn)
    .after((testController: Inner.TestController) => {
      assertValueIsDefined(runId);

      const utcTimeInMs = Date.now() as UtcTimeInMs;

      const {errs} = testController.testRun;

      const errors = errs.map(({errMsg}) => ({message: errMsg}));

      return registerFinishTestEvent({errors, runId, utcTimeInMs});
    });
};
