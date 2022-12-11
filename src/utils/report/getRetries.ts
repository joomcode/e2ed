import {getRunLabelObject} from '../runLabel';

import type {FullTestRun, Retry, UtcTimeInMs} from '../../types/internal';

type RawRetry = Readonly<{
  concurrency: number;
  retryFullTestRuns: FullTestRun[];
}>;

/**
 * Get array of retries from array of full test runs.
 * @internal
 */
export const getRetries = (fullTestRuns: readonly FullTestRun[]): readonly Retry[] => {
  const retries: Retry[] = [];
  const fullTestRunsHash: Record<number, RawRetry> = {};

  for (const fullTestRun of fullTestRuns) {
    const {runLabel} = fullTestRun;
    const {concurrency, retryIndex} = getRunLabelObject(runLabel);

    if (fullTestRunsHash[retryIndex] === undefined) {
      const rawRetry: RawRetry = {concurrency, retryFullTestRuns: []};

      fullTestRunsHash[retryIndex] = rawRetry;
    }

    fullTestRunsHash[retryIndex]?.retryFullTestRuns.push(fullTestRun);
  }

  for (const [retryString, {concurrency, retryFullTestRuns}] of Object.entries(fullTestRunsHash)) {
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

    const fullRetry: Retry = {
      concurrency,
      endTimeInMs,
      fullTestRuns: retryFullTestRuns,
      retryIndex,
      startTimeInMs,
    };

    retries.push(fullRetry);
  }

  retries.sort((a, b) => a.retryIndex - b.retryIndex);

  return retries;
};
