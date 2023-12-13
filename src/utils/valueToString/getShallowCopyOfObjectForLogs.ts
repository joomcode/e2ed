import type {Mutable, PrimitiveValue, PropertyKey} from '../../types/internal';

type Return = Readonly<Record<PropertyKey, PrimitiveValue>>;

/**
 * Get shallow copy of object for logs.
 * Property values that are objects are cast to a string.
 */
export const getShallowCopyOfObjectForLogs = (value: object): Return => {
  const copy = {} as Mutable<Return>;

  for (const key of Reflect.ownKeys(value)) {
    const property = (value as Record<PropertyKey, PrimitiveValue | object>)[key];

    if (property && (typeof property === 'object' || typeof property === 'function')) {
      try {
        copy[key] = String(property);
      } catch (error) {
        const keys = Object.keys(property).join(', ');

        copy[key] = keys === '' ? '[object without keys]' : `[object with keys: ${keys}]`;
      }
    } else {
      copy[key] = property;
    }
  }

  return copy;
};
