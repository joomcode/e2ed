import {setRawMeta} from './context/meta';
import {setRunId} from './context/runId';
import {getRandomId} from './utils/getRandomId';
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

  test.before((testController: Inner.TestController) => {
    const {filename: filePath} = testController.testRun.test.testFile;
    const runId = getRandomId().replace(/:/g, '-') as RunId;
    const runLabel = process.env.E2ED_RUN_LABEL;
    const utcTimeInMs = Date.now() as UtcTimeInMs;

    setRunId(runId);
    setRawMeta(options.meta);

    return registerRunTestEvent({filePath, name, options, runId, runLabel, utcTimeInMs});
  })(name, testFn);
};
