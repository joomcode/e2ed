import {isDebug} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {E2edError} from '../error';
import {setCustomInspectOnFunction} from '../fn';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';

import type {AsyncVoid} from '../../types/internal';

type Return<PromiseValue, ResolveValue, RejectValue> = Readonly<{
  clearRejectTimeout: () => void;
  promiseWithTimeout: Promise<PromiseValue>;
  reject: (error: RejectValue) => void;
  resolve: (value: ResolveValue) => void;
  setRejectTimeoutFunction: (rejectTimeoutFunction: () => AsyncVoid) => void;
}>;

const maxTimeoutInMs = 3600_000;

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
    const timeoutWithUnits = getDurationWithUnits(timeoutInMs);

    const error = new E2edError(
      `Promise was rejected after ${timeoutWithUnits} timeout by default reject function`,
    );

    reject?.(error as RejectValue);
  };

  const timeoutId = setTimeout(
    (async () => {
      try {
        await rejectTimeoutFunction();
      } catch (error) {
        setCustomInspectOnFunction(rejectTimeoutFunction);

        generalLog('Reject timeout function rejected with error', {error, rejectTimeoutFunction});
      }
    }) as () => void,
    isDebug ? maxTimeoutInMs : timeoutInMs,
  );

  const clearRejectTimeout = (): void => {
    clearTimeout(timeoutId);
  };

  const setRejectTimeoutFunction = (newRejectTimeoutFunction: () => AsyncVoid): void => {
    rejectTimeoutFunction = newRejectTimeoutFunction;
  };

  const promiseWithTimeout = promiseWithoutClear.finally(clearRejectTimeout);

  return {clearRejectTimeout, promiseWithTimeout, reject, resolve, setRejectTimeoutFunction};
};
