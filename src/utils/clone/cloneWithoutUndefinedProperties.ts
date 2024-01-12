import {assertValueIsDefined} from '../asserts';

import type {CloneWithoutUndefinedProperties, ObjectEntries} from '../../types/internal';

/**
 * Clone object without properties that values is `undefined`.
 */
export const cloneWithoutUndefinedProperties = <Type extends object>(
  x: Type,
): CloneWithoutUndefinedProperties<Type> => {
  const result = {} as CloneWithoutUndefinedProperties<Type>;

  for (const [key, value] of Object.entries(x) as ObjectEntries<Type>) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor, 'descriptor is defined', {key, x});

    if (value !== undefined) {
      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
