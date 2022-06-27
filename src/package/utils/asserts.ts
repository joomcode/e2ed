import {E2EDError} from './E2EDError';

import type {LogParams} from '../types/internal';

/**
 * Asserts that the value is defined (is not undefined).
 */
export function assertValueIsDefined<T>(
  value: T,
  check: string,
  payload?: LogParams,
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new E2EDError('Asserted value is undefined', {check, payload});
  }
}

/**
 * Asserts that the value is undefined (is not defined).
 */
export function assertValueIsUndefined<T>(
  value: T,
  check: string,
  payload?: LogParams,
): asserts value is T & undefined {
  if (value !== undefined) {
    throw new E2EDError('Asserted value is defined', {check, payload});
  }
}

/**
 * Asserts that the value is not null.
 */
export function assertValueIsNotNull<T>(
  value: T,
  check: string,
  payload?: LogParams,
): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new E2EDError('Asserted value is null', {check, payload});
  }
}

/**
 * Asserts that the value is null.
 */
export function assertValueIsNull<T>(
  value: T,
  check: string,
  payload?: LogParams,
): asserts value is null & T {
  if (value !== null) {
    throw new E2EDError('Asserted value is not null', {check, payload});
  }
}

/**
 * Asserts that the value is false (strictly equal to false).
 */
export function assertValueIsFalse<T>(
  value: T | false,
  check: string,
  payload?: LogParams,
): asserts value is false {
  if (value !== false) {
    throw new E2EDError('Asserted value is not false', {check, payload, value});
  }
}

/**
 * Asserts that the value is true (strictly equal to true).
 */
export function assertValueIsTrue<T>(
  value: T | true,
  check: string,
  payload?: LogParams,
): asserts value is true {
  if (value !== true) {
    throw new E2EDError('Asserted value is not true', {check, payload, value});
  }
}
