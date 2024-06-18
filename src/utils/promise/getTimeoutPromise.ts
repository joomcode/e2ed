import {e2edEnvironment} from '../../constants/internal';

const maxTimeoutInMs = 3600_000;

/**
 * Get promise that waits for timeout in `delayInMs` milliseconds.
 */
export const getTimeoutPromise = (delayInMs: number): Promise<void> =>
  new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setTimeout(resolve, e2edEnvironment.E2ED_DEBUG ? maxTimeoutInMs : delayInMs);
  });
