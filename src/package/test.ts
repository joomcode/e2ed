import {afterTest, beforeTest, runTest} from './utils/test';
import {fixture, test as testcafeTest} from './testcafe';

import type {Inner} from 'testcafe-without-typecheck';

import type {TestFn, TestOptions, TestRunState} from './types/internal';

/**
 * Creates test with name, metatags, options and test function.
 */
export const test = (name: string, options: TestOptions, testFn: TestFn): void => {
  fixture(' - e2ed - ');

  const testRunState: TestRunState = {
    error: undefined,
    name,
    options,
    runId: undefined,
    testFn,
    testFnClosure: undefined,
  };

  testcafeTest(name, async (testController: Inner.TestController) => {
    try {
      beforeTest(testRunState, testController);

      await runTest(testRunState);
    } catch (error) {
      (testRunState as {error: typeof error}).error = error;

      throw error;
    } finally {
      await afterTest(testRunState);
    }
  });
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
