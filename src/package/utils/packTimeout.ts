import {startTimeInMs} from '../configurator';
import {EndE2edReason} from '../constants/internal';

import {endE2ed, endE2edReason} from './end';
import {getFullConfig} from './getFullConfig';

let rejectPackTimeoutPromise: (() => void) | undefined;

/**
 * Get pack timeout promise (that rejects after the timeout expired).
 * @internal
 */
export const getPackTimeoutPromise = (): Promise<void> =>
  new Promise((resolve, reject) => {
    rejectPackTimeoutPromise = reject;

    if (endE2edReason !== undefined) {
      rejectPackTimeoutPromise();
    }
  });

/**
 * Set pack timeout from config field "packTimeout".
 * @internal
 */
export const setPackTimeout = (): void => {
  const {packTimeout} = getFullConfig();
  const timeIntervalElapsedSinceStart = Date.now() - startTimeInMs;

  setTimeout(() => {
    rejectPackTimeoutPromise?.();

    endE2ed(EndE2edReason.PackTimeoutExpired);
  }, packTimeout - timeIntervalElapsedSinceStart);
};
