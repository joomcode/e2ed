import {startTimeInMs} from '../../configurator';

import {registerStartE2edRunEvent} from '../events';
import {getFullConfig} from '../getFullConfig';

import {processRetry} from './processRetry';

import type {E2edRunEvent, RetriesState} from '../../types/internal';

/**
 * Run retries of remaining tests in a loop.
 * @internal
 */
export const runRetries = async (retriesState: RetriesState): Promise<void> => {
  const e2edRunEvent: E2edRunEvent = {utcTimeInMs: startTimeInMs};

  await registerStartE2edRunEvent(e2edRunEvent);

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
};
