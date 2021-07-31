/**
 * Get promise that waits delayInMs milliseconds.
 */
export const getWaitPromise = (delayInMs: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, delayInMs);
  });
