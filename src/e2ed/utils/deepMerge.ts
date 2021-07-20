const isObject = (x: unknown) => x !== null && typeof x === 'object' && Array.isArray(x) === false;

/**
 * Deep merge two objects (arrays does not merge).
 * y overwrites x; x and y are immutable.
 */
export const deepMerge = <T>(x: T, y: T): T => {
  const result: T = {...x};

  for (const [key, value] of Object.entries(y) as Array<[keyof T, T[keyof T]]>) {
    if (isObject(x[key]) && isObject(value)) {
      result[key] = deepMerge(x[key], value);
    } else {
      result[key] = value;
    }
  }

  return result;
};
