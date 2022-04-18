import {E2EDError} from './E2EDError';

/**
 * Asserts that the value is defined (is not undefined).
 */
export function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new E2EDError('Asserted value is undefined', {value});
  }
}

/**
 * Asserts that the value is not null.
 */
export function assertValueIsNotNull<T>(value: T): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new E2EDError('Asserted value is null', {value});
  }
}

/**
 * Asserts that the value is false (strictly equal to false).
 */
export function assertValueIsFalse<T>(value: T | false): asserts value is false {
  if (value !== false) {
    throw new E2EDError('Asserted value is not false', {value});
  }
}

/**
 * Asserts that the value is true (strictly equal to true).
 */
export function assertValueIsTrue<T>(value: T | true): asserts value is true {
  if (value !== true) {
    throw new E2EDError('Asserted value is not true', {value});
  }
}
