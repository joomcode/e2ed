import {E2edError} from '../error';

import type {LogParams} from '../../types/internal';

type Options = Readonly<{check: string; payload?: LogParams; skipCheckInRuntime: boolean}>;

/**
 * Asserts that the value has concrete property (maybe not own).
 */
export function assertValueHasProperty<T extends object, Property extends string | symbol>(
  value: T,
  property: Property,
  options: Options,
): asserts value is T & Record<Property, unknown> {
  const {check, payload, skipCheckInRuntime} = options;

  if (skipCheckInRuntime) {
    return;
  }

  if (!(property in value)) {
    throw new E2edError(`Asserted value has no property ${String(property)}`, {
      check,
      payload,
      value,
    });
  }
}
