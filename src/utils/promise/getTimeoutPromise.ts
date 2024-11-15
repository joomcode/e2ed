import {isDebug} from '../../constants/internal';

const maxTimeoutInMs = 3600_000;

/**
 * Get promise that waits for timeout in `delayInMs` milliseconds.
 */
export const getTimeoutPromise = (delayInMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, isDebug ? maxTimeoutInMs : delayInMs);
  });
