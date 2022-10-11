import {assertValueIsDefined} from '../asserts';
import {E2EDError} from '../E2EDError';

import type {AsyncVoid} from '../../types/internal';

type Return<PromiseValue, ResolveValue, RejectValue> = Readonly<{
  clearRejectTimeout: () => void;
  promise: Promise<PromiseValue>;
  reject: (error: RejectValue) => void;
  resolve: (value: ResolveValue) => void;
  setRejectTimeoutFunction: (rejectTimeoutFunction: () => AsyncVoid) => void;
}>;

/**
 * Get typed promise with his resolve and reject functions,
 * and with setted timeout.
 */
export const getPromiseWithResolveAndReject = <
  PromiseValue = unknown,
  ResolveValue = PromiseValue,
  RejectValue = unknown,
>(
  timeoutInMs: number,
): Return<PromiseValue, ResolveValue, RejectValue> => {
  let reject: Return<PromiseValue, ResolveValue, RejectValue>['reject'] | undefined;
  let resolve: Return<PromiseValue, ResolveValue, RejectValue>['resolve'] | undefined;

  const promiseWithoutClear = new Promise<PromiseValue>((res, rej) => {
    resolve = res as typeof resolve;
    reject = rej;
  });

  assertValueIsDefined(reject, 'reject is defined', {promiseWithoutClear, resolve});
  assertValueIsDefined(resolve, 'resolve is defined', {promiseWithoutClear, reject});

  let rejectTimeoutFunction = (): AsyncVoid => {
    const error = new E2EDError(
      `Promise was rejected after ${timeoutInMs}ms timeout by default reject function`,
    );

    reject?.(error as RejectValue);
  };

  const timeoutId = setTimeout(
    (async () => {
      await rejectTimeoutFunction();
    }) as () => void,
    timeoutInMs,
  );

  const clearRejectTimeout = (): void => {
    clearTimeout(timeoutId);
  };

  const setRejectTimeoutFunction = (newRejectTimeoutFunction: () => AsyncVoid): void => {
    rejectTimeoutFunction = newRejectTimeoutFunction;
  };

  const promise = promiseWithoutClear.finally(clearRejectTimeout);

  return {clearRejectTimeout, promise, reject, resolve, setRejectTimeoutFunction};
};
