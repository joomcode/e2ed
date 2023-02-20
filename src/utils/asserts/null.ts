import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that the value is not null.
 */
export function assertValueIsNotNull<T>(
  value: T,
  check: string,
  payload?: LogParams,
): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new E2edError('Asserted value is null', {check, payload});
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
    throw new E2edError('Asserted value is not null', {check, payload, value});
  }
}
