import {assertValueIsDefined} from './asserts';

import type {CloneWithoutUndefinedProperties, ObjectEntries} from '../types/internal';

/**
 * Clone object without properties that values is undefined.
 */
export const cloneWithoutUndefinedProperties = <T extends object>(
  x: T,
): CloneWithoutUndefinedProperties<T> => {
  const result = {} as CloneWithoutUndefinedProperties<T>;

  for (const [key, value] of Object.entries(x) as ObjectEntries<T>) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor, 'descriptor is undefined', {key, x});

    if (value !== undefined) {
      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
