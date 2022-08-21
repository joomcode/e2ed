import {EndE2edReason} from '../../constants/internal';

import {endE2ed} from '../end';
import {getFullConfig} from '../getFullConfig';

import {processRetry} from './processRetry';

import type {RetriesState} from '../../types/internal';

/**
 * Process retries of remaining tests in a loop.
 * @internal
 */
export const processRetries = async (retriesState: RetriesState): Promise<void> => {
  const fullConfig = getFullConfig();
  const {concurrency, maxRetriesCountInDocker: maxRetriesCount} = fullConfig;

  Object.assign<RetriesState, Partial<RetriesState>>(retriesState, {concurrency, maxRetriesCount});

  for (
    ;
    !retriesState.isLastRetrySuccessful && retriesState.retryIndex <= maxRetriesCount;
    // eslint-disable-next-line no-param-reassign
    (retriesState as {retryIndex: number}).retryIndex += 1
  ) {
    await processRetry(retriesState);
  }

  endE2ed(EndE2edReason.RetriesCycleEnded);
};
