import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that the value is not `null`.
 */
export function assertValueIsNotNull<Type>(
  value: Type,
  check: string,
  payload?: LogParams,
): asserts value is Exclude<Type, null> {
  if (value === null) {
    throw new E2edError('Asserted value is null', {check, payload});
  }
}

/**
 * Asserts that the value is `null`.
 */
export function assertValueIsNull<Type>(
  value: Type,
  check: string,
  payload?: LogParams,
): asserts value is null & Type {
  if (value !== null) {
    throw new E2edError('Asserted value is not null', {check, payload, value});
  }
}
