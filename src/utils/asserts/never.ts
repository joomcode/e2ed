import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that the value is `never` (throw in any case).
 */
export function assertValueIsNever(
  value: never,
  check: string,
  payload?: LogParams,
): value is never {
  throw new E2edError('Asserted value is not never', {check, payload, value});
}
