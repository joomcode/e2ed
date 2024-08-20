import {EndE2edReason} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {endE2ed} from '../end';
import {generalLog} from '../generalLog';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {afterRetries} from './afterRetries';
import {processRetry} from './processRetry';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Runs e2ed pack of tests (or tasks) with retries.
 * @internal
 */
export const runPackWithRetries = async (): Promise<void> => {
  const retriesState: RetriesState = {
    concurrency: 1,
    failedTestNamesInLastRetry: [],
    startLastRetryTimeInMs: 0 as UtcTimeInMs,
    successfulTestRunNamesHash: Object.create(null) as {},
    visitedTestRunEventsFileName: [],
  };

  try {
    const {concurrency} = getFullPackConfig();

    setReadonlyProperty(retriesState, 'concurrency', concurrency);

    await processRetry(retriesState);

    endE2ed(EndE2edReason.RetriesCycleEnded);
  } catch (error) {
    generalLog('Caught unexpected error', {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  } finally {
    afterRetries(retriesState);
  }
};
