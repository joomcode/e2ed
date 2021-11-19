/**
 * Returns a function that takes a key and returns
 * the number of function calls with that key.
 */
export const getKeysCounter = (): ((key: string) => number) => {
  const cache: Record<string, number> = {};

  return (key: string): number => {
    if (!(key in cache)) {
      cache[key] = 0;
    }

    cache[key] += 1;

    return cache[key];
  };
};
