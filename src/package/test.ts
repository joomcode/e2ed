import {afterTest, getBeforeTest, getWrappedTest} from './utils/test';
import {fixture, test as testcafeTest} from './testcafe';

import type {TestFn, TestOptions, TestRunState} from './types/internal';

/**
 * Creates test with name, metatags, options and test function.
 */
export const test = (name: string, options: TestOptions, testFn: TestFn): void => {
  fixture(' - e2ed - ');

  const testRunState: TestRunState = {
    name,
    options,
    previousRunId: undefined,
    testFn,
    testFnClosure: undefined,
  };

  const beforeTest = getBeforeTest(testRunState);
  const wrappedTest = getWrappedTest(testRunState);

  testcafeTest.before(beforeTest)(name, wrappedTest).after(afterTest);
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
