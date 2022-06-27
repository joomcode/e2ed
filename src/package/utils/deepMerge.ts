import {assertValueIsDefined} from './asserts';
import {isObjectAndNotAnArray} from './isObjectAndNotAnArray';

import type {DeepPartial} from '../types/internal';

/**
 * Deep merge two objects (arrays does not merge).
 * y overwrites x; x and y are immutable.
 */
export const deepMerge = <T>(x: T, y: DeepPartial<T>): T => {
  const result = {} as T;

  for (const key of Object.keys(x)) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor, 'descriptor is defined', {key, x});

    Object.defineProperty(result, key, descriptor);
  }

  for (const [key, value] of Object.entries(y) as Array<[keyof T, T[keyof T]]>) {
    if (isObjectAndNotAnArray(x[key]) && isObjectAndNotAnArray(value)) {
      result[key] = deepMerge(x[key], value);
    } else {
      const descriptor = Object.getOwnPropertyDescriptor(y, key);

      assertValueIsDefined(descriptor, 'descriptor is defined', {key, y});

      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
