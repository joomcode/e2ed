import {E2EDError} from './E2EDError';

import type {LogParams} from '../types/internal';

/**
 * Asserts that the value is defined (is not undefined).
 */
export function assertValueIsDefined<T>(
  value: T,
  message: string,
  payload?: LogParams,
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new E2EDError('Asserted value is undefined', {message, payload});
  }
}

/**
 * Asserts that the value is not null.
 */
export function assertValueIsNotNull<T>(
  value: T,
  message: string,
  payload?: LogParams,
): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new E2EDError('Asserted value is null', {message, payload});
  }
}

/**
 * Asserts that the value is false (strictly equal to false).
 */
export function assertValueIsFalse<T>(
  value: T | false,
  message: string,
  payload?: LogParams,
): asserts value is false {
  if (value !== false) {
    throw new E2EDError('Asserted value is not false', {message, payload, value});
  }
}

/**
 * Asserts that the value is true (strictly equal to true).
 */
export function assertValueIsTrue<T>(
  value: T | true,
  message: string,
  payload?: LogParams,
): asserts value is true {
  if (value !== true) {
    throw new E2EDError('Asserted value is not true', {message, payload, value});
  }
}
