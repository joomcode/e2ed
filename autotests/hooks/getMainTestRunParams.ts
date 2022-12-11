import type {TestMeta} from 'autotests/types';
import type {TestRun} from 'e2ed/types';

/**
 * This hook is used to get main test run parameters for HTML report.
 * The resulting value is used in test runs list in HTML report,
 * and usually it should uniquely characterize the test, for example, as id.
 */
export const getMainTestRunParams = (testRun: TestRun<TestMeta>): string => {
  // As with all hooks, you can replace it with your own implementation.
  const {options} = testRun;

  return options.meta.testId;
};
