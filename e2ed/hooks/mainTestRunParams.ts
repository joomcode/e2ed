import type {TestRun} from 'e2ed/types';

/**
 * This hook is used to get main test run parameters for HTML report.
 * The resulting value is used in test runs list in HTML report.
 * As with all hooks, you can replace it with your own implementation.
 */
export const mainTestRunParams = (testRun: TestRun): string => {
  const {options} = testRun;

  return options.meta.testId;
};
