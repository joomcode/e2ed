/**
 * Asserts that the value is defined (is not `undefined`).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export function assertValueIsDefined<T>(value: T): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new TypeError('Asserted value is not defined');
  }
}
