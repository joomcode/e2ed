import {E2EUtilsError} from './E2EUtilsError';

/**
 * Asserts that the value is defined (is not undefined).
 */
export function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new E2EUtilsError('Asserted value is undefined', {value});
  }
}
