import type {PropertyKey} from '../types/internal';

type WithToJson = Readonly<{toJSON: (key?: PropertyKey) => unknown}>;

/**
 * Returns `true`, if value is object with `toJSON` method, and `false` otherwise.
 * @internal
 */
export function hasToJsonMethod<Type>(value: Type): value is Type & WithToJson {
  return (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    'toJSON' in value &&
    typeof value.toJSON === 'function'
  );
}
