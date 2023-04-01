import {
  ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY,
  TEST_RUN_STATUSES_OF_UNIQUE_TESTS,
  TestRunStatus,
} from '../../constants/internal';

import {getFailedTestsMainParams} from './getFailedTestsMainParams';

import type {FullTestRun, Retry} from '../../types/internal';

const MAX_FAILED_TESTS_COUNT = 8;

/**
 * Get summary pack results (count of tests for each status).
 * @internal
 */
export const getSummaryPackResults = (
  fullTestRuns: readonly FullTestRun[],
  lastRetry: Retry | undefined,
): string => {
  const allFailedTestsMainParams = getFailedTestsMainParams(lastRetry);
  const failedTestsMainParams = allFailedTestsMainParams.slice(0, MAX_FAILED_TESTS_COUNT);

  if (allFailedTestsMainParams.length > MAX_FAILED_TESTS_COUNT) {
    failedTestsMainParams.push('...');
  }

  const printedFailedTests = ` (${failedTestsMainParams.join(', ')})`;

  const countsOfStatuses: string[] = [];

  for (const status of ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY) {
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
