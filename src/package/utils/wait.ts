import {getWaitPromise} from './getWaitPromise';
import {log} from './log';

/**
 * Wait delayInMs milliseconds.
 */
export const wait = (delayInMs: number): Promise<void> => {
  log(`Wait for ${delayInMs} ms`);

  return getWaitPromise(delayInMs);
};
