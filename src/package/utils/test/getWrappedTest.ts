import {assertValueIsDefined} from '../asserts';

import type {TestRunState} from '../../types/internal';

/**
 * Get wrapped test by TestRun state.
 * @internal
 */
export const getWrappedTest = (testRunState: TestRunState) => (): Promise<void> => {
  assertValueIsDefined(testRunState.testFnClosure, 'testFnClosure is defined in testRunState', {
    testRunState,
  });

  return testRunState.testFnClosure();
};
