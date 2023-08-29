/**
 * Returns `true`, if value is array, and `false` otherwise.
 */
export function isArray<Type>(value: unknown): value is Type[] {
  return Array.isArray(value);
}
