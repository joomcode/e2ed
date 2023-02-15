import {EndE2edReason} from '../../constants/internal';

import {endE2ed, endE2edReason} from '../end';
import {getFullPackConfig} from '../getFullPackConfig';

import {processRetry} from './processRetry';

import type {RetriesState} from '../../types/internal';

/**
 * Process retries of remaining tests in a loop.
 * @internal
 */
export const processRetries = async (retriesState: RetriesState): Promise<void> => {
  const fullConfig = getFullPackConfig();
  const {concurrency, maxRetriesCountInDocker: maxRetriesCount} = fullConfig;

  Object.assign<RetriesState, Partial<RetriesState>>(retriesState, {concurrency, maxRetriesCount});

  for (
    ;
    retriesState.isLastRetrySuccessful !== true &&
    retriesState.retryIndex <= maxRetriesCount &&
    endE2edReason === undefined;
    // eslint-disable-next-line no-param-reassign
    (retriesState as {retryIndex: number}).retryIndex += 1
  ) {
    await processRetry(retriesState);
  }

  // eslint-disable-next-line no-param-reassign
  (retriesState as {isRetriesCycleEnded: boolean}).isRetriesCycleEnded = true;

  endE2ed(EndE2edReason.RetriesCycleEnded);
};
