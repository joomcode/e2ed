/* eslint-disable no-unsafe-finally */

import {E2edError} from '../error';

import type {AsyncVoid, LogParams} from '../../types/internal';

/**
 * Asserts that a function throws an exception when called.
 * If the function returns a promise, then asserts that this promise will be rejected.
 */
export const assertFunctionThrows = <ReturnedValue extends AsyncVoid>(
  func: (this: void) => ReturnedValue,
  check: string,
  payload?: LogParams,
): ReturnedValue => {
  const errorParams = {check, code: func.toString(), payload};
  let returnedValue = undefined as ReturnedValue;
  let shouldThrowInFinally = true;

  try {
    const functionValue = func();

    if (typeof functionValue?.then === 'function') {
      shouldThrowInFinally = false;

      returnedValue = functionValue.then(
        () => {
          throw new E2edError('Promise from asserted function did not rejected', errorParams);
        },
        () => {},
      ) as ReturnedValue;
    }
  } catch (error) {
    shouldThrowInFinally = false;
  } finally {
    if (shouldThrowInFinally) {
      throw new E2edError('Asserted function did not throw an exception', errorParams);
    }

    return returnedValue;
  }
};
