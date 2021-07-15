import {E2EDError} from './E2EDError';

/**
 * Asserts that the value is defined (is not undefined).
 */
export function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new E2EDError('Asserted value is undefined', {value});
  }
}
