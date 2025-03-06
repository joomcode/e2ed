import {EndE2edReason} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {endE2ed} from '../end';
import {generalLog, writeLogsToFile} from '../generalLog';
import {setReadonlyProperty} from '../object';
import {createRunLabel} from '../runLabel';

import {afterRetries} from './afterRetries';
import {runRetry} from './runRetry';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';
import {updateRetriesStateAfterRetry} from './updateRetriesStateAfterRetry';

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
    const {concurrency, maxRetriesCountInDocker} = getFullPackConfig();

    setReadonlyProperty(retriesState, 'concurrency', concurrency);

    const runLabel = createRunLabel({concurrency, maxRetriesCount: maxRetriesCountInDocker});

    const startLastRetryTimeInMs = Date.now() as UtcTimeInMs;

    setReadonlyProperty(retriesState, 'startLastRetryTimeInMs', startLastRetryTimeInMs);

    generalLog(`Run tests (${runLabel}, concurrency ${concurrency})`, {
      retriesState: truncateRetriesStateForLogs(retriesState),
    });

    await writeLogsToFile();

    await runRetry({runLabel, successfulTestRunNamesHash: retriesState.successfulTestRunNamesHash});

    endE2ed(EndE2edReason.RetriesCycleEnded);
  } catch (error) {
    generalLog('Caught an error on running test', {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  } finally {
    await updateRetriesStateAfterRetry(retriesState).catch(() => {});

    afterRetries(retriesState);
  }
};
