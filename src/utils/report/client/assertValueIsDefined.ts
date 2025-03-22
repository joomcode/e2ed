/**
 * Asserts that the value is defined (is not `undefined`).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function assertValueIsDefined<Type>(value: Type): asserts value is Exclude<Type, undefined> {
  if (value === undefined) {
    throw new TypeError('Asserted value is not defined');
  }
}
