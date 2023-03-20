/**
 * Returns `true`, if value is array, and `false` otherwise.
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}
