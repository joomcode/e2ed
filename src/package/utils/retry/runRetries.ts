import {generalLog} from '../generalLog';

import {afterRetries} from './afterRetries';
import {getPrintedRetry} from './getPrintedRetry';
import {processRetries} from './processRetries';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Run e2ed tests (tasks) with retries.
 * @internal
 */
export const runRetries = async (): Promise<void> => {
  const retriesState: RetriesState = {
    concurrency: 1,
    failedTestNamesInLastRetry: [],
    isLastRetrySuccessful: false,
    isRetriesCycleEnded: false,
    maxRetriesCount: 1,
    retryIndex: 1,
    startLastRetryTimeInMs: 0 as UtcTimeInMs,
    successfulTestRunNamesHash: {},
    visitedTestRunEventsFileName: [],
  };

  try {
    await processRetries(retriesState);
  } catch (error) {
    const printedRetry = getPrintedRetry(retriesState);

    generalLog(`Caught unexpected error on ${printedRetry}`, {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  } finally {
    afterRetries(retriesState);
  }
};
