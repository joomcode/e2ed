/**
 * Get promise that waits for timeout in `delayInMs` milliseconds.
 */
export const getTimeoutPromise = (delayInMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayInMs);
  });
