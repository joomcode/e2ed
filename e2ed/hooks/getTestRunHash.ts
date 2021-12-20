import type {RunHash, TestRun} from 'e2ed/types';

/**
 * This hook is used before runnig the test to get unique test run hash.
 * The resulting hash is used in HTML report as url hash of test runs,
 * therefore, it is desirable that this hash does not contain
 * special characters like hyphens, colons, and so on.
 * As with all hooks, you can replace it with your own implementation.
 */
export const getTestRunHash = (testRun: TestRun): RunHash => {
  const {options, runLabel} = testRun;

  const label = runLabel ? `-${runLabel}` : '';

  return `${options.meta.testId}${label}` as RunHash;
};
