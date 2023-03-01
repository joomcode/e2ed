import {TestRunStatus} from '../../constants/internal';

import type {Retry} from '../../types/internal';

/**
 * Get array of main parameters of pack's failed tests.
 * @internal
 */
export const getFailedTestsMainParams = (lastRetry: Retry | undefined): readonly string[] => {
  const failedTests =
    lastRetry?.fullTestRuns.filter((fullTestRun) => fullTestRun.status === TestRunStatus.Failed) ??
    [];
  const failedTestsMainParams = failedTests.map(({mainParams}) => mainParams);

  return failedTestsMainParams;
};
