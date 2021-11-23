import {assertValueIsDefined} from './asserts';

/**
 * Return true, if value is object (and return false for arrays).
 */
const isObject = (x: unknown): boolean =>
  x !== null && typeof x === 'object' && Array.isArray(x) === false;

/**
 * Deep merge two objects (arrays does not merge).
 * y overwrites x; x and y are immutable.
 */
export const deepMerge = <T>(x: T, y: Partial<T>): T => {
  const result = {} as T;

  for (const key of Object.keys(x)) {
    const descriptor = Object.getOwnPropertyDescriptor(x, key);

    assertValueIsDefined(descriptor);

    Object.defineProperty(result, key, descriptor);
  }

  for (const [key, value] of Object.entries(y) as Array<[keyof T, T[keyof T]]>) {
    if (isObject(x[key]) && isObject(value)) {
      result[key] = deepMerge(x[key], value);
    } else {
      const descriptor = Object.getOwnPropertyDescriptor(y, key);

      assertValueIsDefined(descriptor);

      Object.defineProperty(result, key, descriptor);
    }
  }

  return result;
};
