import {TestRunStatus} from '../../constants/internal';

import {getRunLabelObject} from '../runLabel';

import type {FullTestRun, Mutable, Retry, RunId, UtcTimeInMs} from '../../types/internal';

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
    const {runError, isSkipped, previousRunId, runLabel} = fullTestRun;

    if (previousRunId) {
      internallyRetriedRunIds.push(previousRunId);
    }

    const {retryIndex} = getRunLabelObject(runLabel);
    const passedOrFailedStatus =
      runError === undefined ? TestRunStatus.Passed : TestRunStatus.Failed;
    const status = isSkipped ? TestRunStatus.Skipped : passedOrFailedStatus;

    (fullTestRun as Mutable<FullTestRun>).status = status;

    if (fullTestRunsHash[retryIndex] === undefined) {
      fullTestRunsHash[retryIndex] = [];
    }

    fullTestRunsHash[retryIndex]?.push(fullTestRun);
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

    const retryIndex = Number(retryString);

    const fullRetry = {endTimeInMs, fullTestRuns: retryFullTestRuns, retryIndex, startTimeInMs};

    retries.push(fullRetry);
  }

  retries.sort((a, b) => a.retryIndex - b.retryIndex);

  return retries;
};
