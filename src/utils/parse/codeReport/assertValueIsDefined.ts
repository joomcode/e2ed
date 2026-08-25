/**
 * Asserts that the value is defined (is not `undefined`).
 * @internal
 */
export function assertValueIsDefined<Type>(
  value: Type,
  check: string,
): asserts value is Exclude<Type, undefined> {
  if (value === undefined) {
    throw new Error(check);
  }
}
