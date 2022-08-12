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

/**
 * Creates test with name, metatags,
 * options and test function (alias for test function).
 */
export const it = test;

/**
 * Creates independent task with name, metatags,
 * options and task function (alias for test function).
 */
export const task = test;
