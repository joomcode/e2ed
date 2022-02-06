import {TestRunStatus} from '../../constants/internal';

import {getRunLabelObject} from '../runLabel';

import type {
  ReportData,
  RetryProps,
  RunId,
  TestRunButtonProps,
  UtcTimeInMs,
} from '../../types/internal';

/**
 * Get array of RetryProps from report data.
 * @internal
 */
export const getRetriesProps = ({testRunsWithHooks}: ReportData): RetryProps[] => {
  const internallyRetriedRunIds: RunId[] = [];
  const retries: RetryProps[] = [];
  const testRunButtonsHash: Record<number, TestRunButtonProps[]> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    const {
      endTimeInMs,
      errors,
      filePath,
      mainParams,
      name,
      previousRunId,
      runHash,
      runId,
      runLabel,
      startTimeInMs,
    } = testRunWithHooks;

    if (previousRunId) {
      internallyRetriedRunIds.push(previousRunId);
    }

    const {retry} = getRunLabelObject(runLabel);

    const status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    const testRunButtonProps = {
      endTimeInMs,
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

    const startTimes = testRunButtons.map((testRun) => testRun.startTimeInMs);
    const startTimeInMs = Math.min(...startTimes) as UtcTimeInMs;

    const endTimes = testRunButtons.map((testRun) => testRun.endTimeInMs);
    const endTimeInMs = Math.max(...endTimes) as UtcTimeInMs;

    const retry = Number(retryString);

    const testRunsList = {endTimeInMs, hidden: true, retry, startTimeInMs, testRunButtons};

    retries.push(testRunsList);
  }

  retries.sort((a, b) => a.retry - b.retry);

  if (retries[0]) {
    (retries[0] as {hidden: boolean}).hidden = false;
  }

  return retries;
};
