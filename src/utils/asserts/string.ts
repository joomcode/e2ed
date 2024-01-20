import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that the value is string.
 */
export function assertValueIsString<Type>(
  value: Type,
  check: string,
  payload?: LogParams,
): asserts value is Type & string {
  if (typeof value !== 'string') {
    throw new E2edError('Asserted value is not a string', {check, payload, value});
  }
}
