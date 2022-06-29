import {assertValueIsDefined} from './asserts';

type CloneWithoutUndefinedProperties<T extends object> = {
  [Key in keyof T]: Exclude<T[Key], undefined>;
};

/**
 * Clone object without properties that values is undefined.
 */
export const cloneWithoutUndefinedProperties = <T extends object>(
  x: T,
): CloneWithoutUndefinedProperties<T> => {
  const result = {} as CloneWithoutUndefinedProperties<T>;

  for (const [key, value] of Object.entries(x) as Array<[keyof T, T[keyof T]]>) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor, 'descriptor is undefined', {key, x});

    if (value !== undefined) {
      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
