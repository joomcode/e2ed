import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that the value is boolean ('true` or `false`).
 */
export function assertValueIsBoolean<Type>(
  value: Type,
  check: string,
  payload?: LogParams,
): asserts value is Type & boolean {
  if (typeof value !== 'boolean') {
    throw new E2edError('Asserted value is not a boolean', {check, payload, value});
  }
}

/**
 * Asserts that the value is `false` (strictly equal to `false`).
 */
export function assertValueIsFalse<Type>(
  value: Type | false,
  check: string,
  payload?: LogParams,
): asserts value is false {
  if (value !== false) {
    throw new E2edError('Asserted value is not false', {check, payload, value});
  }
}

/**
 * Asserts that the value is `true` (strictly equal to `true`).
 */
export function assertValueIsTrue<Type>(
  value: Type | true,
  check: string,
  payload?: LogParams,
): asserts value is true {
  if (value !== true) {
    throw new E2edError('Asserted value is not true', {check, payload, value});
  }
}
