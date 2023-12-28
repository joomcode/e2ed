import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

/**
 * Asserts that number is positive integer.
 */
export function assertNumberIsPositiveInteger(
  value: number,
  check: string,
  payload?: LogParams,
): asserts value is number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new E2edError('Asserted number is not a positive integer', {check, payload, value});
  }
}
