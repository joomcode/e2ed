import {generalLog} from '../generalLog';
import {createRunLabel} from '../runLabel';

import {getPrintedRetry} from './getPrintedRetry';
import {runRetry} from './runRetry';
import {truncateRetriesStateForLogs} from './truncateRetriesStateForLogs';
import {updateRetriesStateAfterRetry} from './updateRetriesStateAfterRetry';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Process current retry in retries cycle.
 * @internal
 */
export const processRetry = async (retriesState: RetriesState): Promise<void> => {
  const {concurrency, maxRetriesCount, retryIndex, successfulTestRunNamesHash} = retriesState;
  const runLabel = createRunLabel({concurrency, maxRetriesCount, retryIndex});

  const startLastRetryTimeInMs = Date.now() as UtcTimeInMs;
  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});

  // eslint-disable-next-line no-param-reassign
  (retriesState as {startLastRetryTimeInMs: number}).startLastRetryTimeInMs =
    startLastRetryTimeInMs;

  generalLog(`Run tests (${printedRetry}, concurrency ${concurrency})`, {
    retriesState: truncateRetriesStateForLogs(retriesState),
  });

  try {
    await runRetry({concurrency, runLabel, successfulTestRunNamesHash});

    // eslint-disable-next-line no-param-reassign
    (retriesState as {isLastRetrySuccessful: boolean}).isLastRetrySuccessful = true;
  } catch (error) {
    generalLog(`Caught an error on ${printedRetry}`, {
      error,
      retriesState: truncateRetriesStateForLogs(retriesState),
    });
  }

  await updateRetriesStateAfterRetry(retriesState);
};
