import {assertValueIsDefined} from '../asserts';

import type {TestRunState} from '../../types/internal';

/**
 * Run one test with TestRun state.
 * @internal
 */
export const runTest = async (testRunState: TestRunState): Promise<void> => {
  assertValueIsDefined(testRunState.testFnClosure, 'testFnClosure is defined in testRunState', {
    testRunState,
  });

  await testRunState.testFnClosure();
};
