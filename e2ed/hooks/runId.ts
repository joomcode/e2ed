import type {RunId, RunTestOwnParams} from 'e2ed/types';

/**
 * This hook is used before runnig the test to get unique test run id.
 * The resulting value is used in HTML report.
 * As with all hooks, you can replace it with your own implementation.
 */
export const runId = (runTestOwnParams: RunTestOwnParams): RunId => {
  const {options, runLabel} = runTestOwnParams;

  const label = runLabel ? `-${runLabel}` : '';

  return `${options.meta.testId}${label}` as RunId;
};
