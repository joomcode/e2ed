import {getWaitPromise} from './getWaitPromise';
import {log} from './log';

/**
 * Wait delayInMs milliseconds.
 */
export const wait = async (delayInMs: number): Promise<void> => {
  await log(`Wait for ${delayInMs} ms`, 'internalUtil');

  return getWaitPromise(delayInMs);
};
