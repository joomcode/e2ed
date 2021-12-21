import {TestRunStatus} from '../../constants/internal';

import {getRunHashUnificator} from './getRunHashUnificator';

import type {ReportData, RunId, TestRunButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Get array of TestRunsListProps (by retries) from report data.
 * @internal
 */
export const getTestRunsLists = ({testRunsWithHooks}: ReportData): TestRunsListProps[] => {
  const runHashUnificator = getRunHashUnificator();

  const internallyRetriedRunIds: RunId[] = [];
  const testRunsLists: TestRunsListProps[] = [];
  const testRunButtonsHash: Record<number, TestRunButtonProps[]> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    const {
      errors,
      filePath,
      mainParams,
      name,
      previousRunId,
      runHash: maybeDuplicateRunHash,
      runId,
      runLabel,
      startTimeInMs,
      endTimeInMs,
    } = testRunWithHooks;

    const durationInMs = endTimeInMs - startTimeInMs;

    if (previousRunId) {
      internallyRetriedRunIds.push(previousRunId);
    }

    const retry = parseInt((runLabel || 'retry 1').slice(6), 10);

    const {duplicate, runHash} = runHashUnificator(maybeDuplicateRunHash);

    let status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    if (duplicate) {
      status = TestRunStatus.Unknown;
    }

    const testRunButtonProps = {
      durationInMs,
      filePath,
      mainParams,
      name,
      runHash,
      runId,
      startTimeInMs,
      status,
    };

    if (testRunButtonsHash[retry] === undefined) {
      testRunButtonsHash[retry] = [];
    }

    testRunButtonsHash[retry].push(testRunButtonProps);
  }

  for (const [retryString, testRunButtons] of Object.entries(testRunButtonsHash)) {
    for (const testRunButton of testRunButtons) {
      if (internallyRetriedRunIds.includes(testRunButton.runId)) {
        (testRunButton as {status: TestRunStatus}).status = TestRunStatus.Broken;
      }
    }

    testRunButtons.sort((a, b) => {
      if (a.filePath > b.filePath) {
        return 1;
      }

      if (a.filePath < b.filePath) {
        return -1;
      }

      return a.startTimeInMs - b.startTimeInMs;
    });

    const retry = Number(retryString);

    const testRunsList = {hidden: true, retry, testRunButtons};

    testRunsLists.push(testRunsList);
  }

  testRunsLists.sort((a, b) => a.retry - b.retry);

  if (testRunsLists[0]) {
    (testRunsLists[0] as {hidden: boolean}).hidden = false;
  }

  return testRunsLists;
};
