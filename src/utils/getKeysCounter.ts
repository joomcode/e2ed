import {assertValueIsDefined} from './asserts';

/**
 * Returns a function that takes a key and returns
 * the number of function calls with that key.
 */
export const getKeysCounter = (): ((key: string) => number) => {
  const cache: Record<string, number> = Object.create(null) as {};

  return (key: string): number => {
    if (!(key in cache)) {
      cache[key] = 0;
    }

    (cache[key] as number) += 1;

    const count = cache[key];

    assertValueIsDefined(count, 'count is defined', {cache, key});

    return count;
  };
};
