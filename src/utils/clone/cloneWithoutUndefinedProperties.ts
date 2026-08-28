import {assertValueIsDefined} from '../asserts';

import type {CloneWithoutUndefinedProperties, ObjectEntries} from '../../types/internal';

/**
 * Clone object without properties that values is `undefined`.
 */
export const cloneWithoutUndefinedProperties = <Type extends object>(
  object: Type,
): CloneWithoutUndefinedProperties<Type> => {
  const result = Object.create(null) as CloneWithoutUndefinedProperties<Type>;

  for (const [key, value] of Object.entries(object) as ObjectEntries<Type>) {
    const descriptor = Object.getOwnPropertyDescriptor(object, key);

    assertValueIsDefined(descriptor, 'descriptor is defined', {key, object});

    if (value !== undefined) {
      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
