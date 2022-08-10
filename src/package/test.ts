import {setError} from './context/error';
import {generalLog} from './utils/generalLog';
import {afterTest, beforeTest} from './utils/test';
import {valueToString} from './utils/valueToString';
import {fixture, test as testcafeTest} from './testcafe';

import type {Inner} from 'testcafe-without-typecheck';

import type {TestFn, TestOptions, TestRunState} from './types/internal';

/**
 * Creates test with name, metatags, options and test function.
 */
export const test = (name: string, options: TestOptions, testFn: TestFn): void => {
  fixture(' - e2ed - ');

  const testRunState: TestRunState = {
    name,
    options,
    runId: undefined,
    testFn,
    testFnClosure: undefined,
  };

  testcafeTest(name, async (testController: Inner.TestController) => {
    try {
      beforeTest(testRunState, testController);

      await testRunState.testFnClosure();
    } catch (error) {
      generalLog(`Test run ${String(testRunState.runId)} failed`, {
        error,
        testName: name,
        testOptions: options,
      });

      setError(valueToString(error));

      throw error;
    } finally {
      await afterTest();
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
