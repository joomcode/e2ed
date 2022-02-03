import type {RunHash, TestRun} from 'e2ed/types';

/**
 * This hook is used before runnig the test to get unique test run hash.
 * The resulting hash is used in HTML report as url hash of test runs,
 * therefore, it is desirable that this hash does not contain
 * special characters like number signs, question marks, colons, and so on.
 */
export const getTestRunHash = (testRun: TestRun): RunHash => {
  // As with all hooks, you can replace it with your own implementation.
  const {options, runLabel} = testRun;

  return `${options.meta.testId}-${runLabel}` as RunHash;
};
