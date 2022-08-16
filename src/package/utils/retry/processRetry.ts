import {generalLog} from '../generalLog';
import {getRunLabel} from '../runLabel';

import {getPrintedRetry} from './getPrintedRetry';
import {runRetry} from './runRetry';
import {updateRetriesStateAfterRetry} from './updateRetriesStateAfterRetry';

import type {RetriesState, UtcTimeInMs} from '../../types/internal';

/**
 * Process current retry in retries cycle.
 * @internal
 */
export const processRetry = async (retriesState: RetriesState): Promise<void> => {
  const {concurrency, maxRetriesCount, retryIndex, successfulTestRunNamesHash} = retriesState;
  const runLabel = getRunLabel({concurrency, maxRetriesCount, retryIndex});

  const startLastRetryTimeInMs = Date.now() as UtcTimeInMs;
  const printedRetry = getPrintedRetry({maxRetriesCount, retryIndex});

  // eslint-disable-next-line no-param-reassign
  (retriesState as {startLastRetryTimeInMs: number}).startLastRetryTimeInMs =
    startLastRetryTimeInMs;

  generalLog(`Run tests (${printedRetry}, concurrency ${concurrency})`, {retriesState});

  try {
    await runRetry({concurrency, runLabel, successfulTestRunNamesHash});

    // eslint-disable-next-line no-param-reassign
    (retriesState as {isLastRetrySuccessful: boolean}).isLastRetrySuccessful = true;
  } catch (error) {
    generalLog(`Caught an error on ${printedRetry}`, {error, retriesState});
  }

  await updateRetriesStateAfterRetry(retriesState);
};
