import {generalLog, writeLogsToFile} from '../generalLog';
import {createRunLabel} from '../runLabel';
import {setReadonlyProperty} from '../setReadonlyProperty';

import {getPrintedRetry} from './getPrintedRetry';
import {runRetry} from './runRetry';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';
import {updateRetriesStateAfterRetry} from './updateRetriesStateAfterRetry';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Processes current retry in retries cycle.
 * @internal
 */
export const processRetry = async (retriesState: RetriesState): Promise<void> => {
  const {
    concurrency,
    maxRetriesCount,
    retryIndex,
    successfulTestRunNamesHash,
    visitedTestNamesHash,
  } = retriesState;
  const runLabel = createRunLabel({concurrency, maxRetriesCount, retryIndex});

  const startLastRetryTimeInMs = Date.now() as UtcTimeInMs;
  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});

  setReadonlyProperty(retriesState, 'startLastRetryTimeInMs', startLastRetryTimeInMs);

  generalLog(`Run tests (${printedRetry}, concurrency ${concurrency})`, {
    retriesState: truncateRetriesStateForLogs(retriesState),
  });

  try {
    await writeLogsToFile();

    await runRetry({runLabel, successfulTestRunNamesHash, visitedTestNamesHash});

    setReadonlyProperty(retriesState, 'isLastRetrySuccessful', true);
  } catch (error) {
    generalLog(`Caught an error on ${printedRetry}`, {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  }

  await updateRetriesStateAfterRetry(retriesState);
};
