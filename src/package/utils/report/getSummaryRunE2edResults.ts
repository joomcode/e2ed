import {
  ORDER_OF_TEST_RUN_STATUSES_FOR_SUMMARY_RESULTS,
  TEST_RUN_STATUSES_OF_UNIQUE_TESTS,
  TestRunStatus,
} from '../../constants/internal';

import type {FullTestRun, Retry} from '../../types/internal';

const MAX_FAILED_TESTS_COUNT = 8;

/**
 * Get summary run e2ed results (count of tests for each status).
 * @internal
 */
export const getSummaryRunE2edResults = (
  fullTestRuns: readonly FullTestRun[],
  lastRetry: Retry | undefined,
): string => {
  const failedTests =
    lastRetry?.fullTestRuns.filter((fullTestRun) => fullTestRun.status === TestRunStatus.Failed) ??
    [];
  const firstFailedTests = failedTests.slice(0, MAX_FAILED_TESTS_COUNT);
  const failedTestsMainParams = firstFailedTests.map(({mainParams}) => mainParams);

  if (failedTests.length > MAX_FAILED_TESTS_COUNT) {
    failedTestsMainParams.push('...');
  }

  const printedFailedTests = ` (${failedTestsMainParams.join(', ')})`;

  const countsOfStatuses: string[] = [];

  for (const status of ORDER_OF_TEST_RUN_STATUSES_FOR_SUMMARY_RESULTS) {
    const source = TEST_RUN_STATUSES_OF_UNIQUE_TESTS.includes(status)
      ? fullTestRuns
      : lastRetry?.fullTestRuns;

    const count = source?.filter((fullTestRun) => fullTestRun.status === status)?.length ?? 0;

    if (count > 0) {
      countsOfStatuses.push(`${count} ${status}`);

      if (status === TestRunStatus.Failed) {
        countsOfStatuses[countsOfStatuses.length - 1] = `${String(
          countsOfStatuses.at(-1),
        )}${printedFailedTests}`;
      }
    }
  }

  const printedCountsOfStatuses = countsOfStatuses.join(', ') || 'no tests were run';

  return printedCountsOfStatuses;
};
