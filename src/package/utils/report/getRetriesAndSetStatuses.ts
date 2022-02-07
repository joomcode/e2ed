import {TestRunStatus} from '../../constants/internal';

import {getRunLabelObject} from '../runLabel';

import type {FullTestRun, Retry, RunId, UtcTimeInMs} from '../../types/internal';

/**
 * Get array of retries from array of full test runs and
 * set statuses for this test runs.
 * @internal
 */
export const getRetriesAndSetStatuses = (
  fullTestRuns: readonly FullTestRun[],
): readonly Retry[] => {
  const internallyRetriedRunIds: RunId[] = [];
  const retries: Retry[] = [];
  const fullTestRunsHash: Record<number, FullTestRun[]> = {};

  for (const fullTestRun of fullTestRuns) {
    const {errors, previousRunId, runLabel} = fullTestRun;

    if (previousRunId) {
      internallyRetriedRunIds.push(previousRunId);
    }

    const {retry} = getRunLabelObject(runLabel);
    const status = errors.length === 0 ? TestRunStatus.Passed : TestRunStatus.Failed;

    (fullTestRun as {status: TestRunStatus}).status = status;

    if (fullTestRunsHash[retry] === undefined) {
      fullTestRunsHash[retry] = [];
    }

    fullTestRunsHash[retry].push(fullTestRun);
  }

  for (const [retryString, retryFullTestRuns] of Object.entries(fullTestRunsHash)) {
    for (const fullTestRun of retryFullTestRuns) {
      if (internallyRetriedRunIds.includes(fullTestRun.runId)) {
        (fullTestRun as {status: TestRunStatus}).status = TestRunStatus.Broken;
      }
    }

    retryFullTestRuns.sort((a, b) => {
      if (a.filePath > b.filePath) {
        return 1;
      }

      if (a.filePath < b.filePath) {
        return -1;
      }

      return a.startTimeInMs - b.startTimeInMs;
    });

    const startTimes = retryFullTestRuns.map((testRun) => testRun.startTimeInMs);
    const startTimeInMs = Math.min(...startTimes) as UtcTimeInMs;

    const endTimes = retryFullTestRuns.map((testRun) => testRun.endTimeInMs);
    const endTimeInMs = Math.max(...endTimes) as UtcTimeInMs;

    const retry = Number(retryString);

    const fullRetry = {endTimeInMs, fullTestRuns: retryFullTestRuns, retry, startTimeInMs};

    retries.push(fullRetry);
  }

  retries.sort((a, b) => a.retry - b.retry);

  return retries;
};
