import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {setErrorToContext} from './setErrorToContext';

import type {Inner} from 'testcafe-without-typecheck';

import type {TestRunStateWithoutReject} from '../../types/internal';

type RunTest = (testController: Inner.TestController) => Promise<void>;

/**
 * Get complete run test function by TestRun state.
 * @internal
 */
export const getRunTest = (testRunState: TestRunStateWithoutReject): RunTest => {
  const {name: testName, options: testOptions} = testRunState;

  return async (testController: Inner.TestController) => {
    try {
      beforeTest(testRunState, testController);

      await testRunState.testFnWithReject();
    } catch (error) {
      setErrorToContext({error, testName, testOptions});

      throw error;
    } finally {
      await afterTest();
    }
  };
};
