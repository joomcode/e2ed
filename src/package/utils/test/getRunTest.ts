import {afterTest} from './afterTest';
import {beforeTest} from './beforeTest';
import {setRunErrorToContext} from './setRunErrorToContext';

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
    } catch (runError) {
      setRunErrorToContext({runError, testName, testOptions});

      throw runError;
    } finally {
      await afterTest();
    }
  };
};
