import {getRunTest, safeJsError} from './utils/test';
import {fixture, test as testcafeTest} from './testcafe';

import type {TestFunction} from './types/internal';

/**
 * Creates test with name, metatags, options and test function.
 * @internal
 */
export const test: TestFunction = (name, options, testFn) => {
  fixture(' - e2ed - ').skipJsErrors(safeJsError);

  const runTest = getRunTest({name, options, testFn});

  testcafeTest(name, runTest);
};
