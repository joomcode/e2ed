import {getRunTest} from './utils/test';
import {fixture, test as testcafeTest} from './testcafe';

import type {TestFn, TestOptions} from './types/internal';

/**
 * Creates test with name, metatags, options and test function.
 */
export const test = (name: string, options: TestOptions, testFn: TestFn): void => {
  fixture(' - e2ed - ');

  const runTest = getRunTest({name, options, testFn});

  testcafeTest(name, runTest);
};
