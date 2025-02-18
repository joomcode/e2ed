import {getPromiseWithResolveAndReject} from './getPromiseWithResolveAndReject';

/**
 * Adds a timeout to the promise, that is, return a promise that will either resolve
 * as the original one or be rejected by a timeout with the specified error.
 */
export const addTimeoutToPromise = <Value>(
  promise: Promise<Value>,
  timeout: number,
  timeoutError: Error | undefined = undefined,
): Promise<Value> => {
  const {clearRejectTimeout, promiseWithTimeout, reject, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject<Value>(timeout);

  if (timeoutError !== undefined) {
    setRejectTimeoutFunction(() => {
      reject(timeoutError);
    });
  }

  return Promise.race([promise, promiseWithTimeout]).finally(clearRejectTimeout);
};
