import {TestRunStatus} from '../../constants/internal';

import {getRunHashUnificator} from './getRunHashUnificator';

import type {ReportData, TestRunButtonProps, TestRunsListProps} from '../../types/internal';

/**
 * Get array of TestRunsListProps (by retries) from report data.
 * @internal
 */
export const getTestRunsLists = ({testRunsWithHooks}: ReportData): TestRunsListProps[] => {
  const runHashUnificator = getRunHashUnificator();

  const testRunsLists: TestRunsListProps[] = [];
  const testRunButtonsHash: Record<number, TestRunButtonProps[]> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    const {
      filePath,
      errors,
      mainParams,
      name,
      runHash: maybeDuplicateRunHash,
      runId,
      runLabel,
      startTimeInMs,
      finishTimeInMs,
    } = testRunWithHooks;

    const durationInMs = finishTimeInMs - startTimeInMs;

    const retry = parseInt((runLabel || 'retry 1').slice(6), 10);

    const {duplicate, runHash} = runHashUnificator(maybeDuplicateRunHash);

    let status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    if (duplicate) {
      status = TestRunStatus.Unknown;
    }

    const testRunButtonProps = {durationInMs, filePath, mainParams, name, runHash, runId, status};

    if (testRunButtonsHash[retry] === undefined) {
      testRunButtonsHash[retry] = [];
    }

    testRunButtonsHash[retry].push(testRunButtonProps);
  }

  for (const [retryString, testRunButtons] of Object.entries(testRunButtonsHash)) {
    testRunButtons.sort((a, b) => (a.filePath > b.filePath ? 1 : -1));

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
