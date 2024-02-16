import {assertValueIsDefined} from './asserts';
import {isObjectAndNotAnArray} from './isObjectAndNotAnArray';

import type {DeepPartial, ObjectEntries, Values} from '../types/internal';

/**
 * Deep merge two objects (arrays does not merge).
 * `y` overwrites `x`; `x` and `y` are immutable.
 */
export const deepMerge = <Type extends object>(x: Type, y: DeepPartial<Type>): Type => {
  const result = {} as unknown as Type;

  for (const key of Object.keys(x)) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor, 'descriptor is defined', {key, x});

    Object.defineProperty(result, key, descriptor);
  }

  for (const [key, value] of Object.entries(y) as ObjectEntries<Type>) {
    if (isObjectAndNotAnArray(x[key]) && isObjectAndNotAnArray(value)) {
      result[key] = deepMerge(x[key] as object, value) as Values<Type>;
    } else {
      const descriptor = Object.getOwnPropertyDescriptor(y, key);

      assertValueIsDefined(descriptor, 'descriptor is defined', {key, y});

      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
