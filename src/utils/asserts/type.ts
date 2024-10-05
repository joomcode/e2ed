/**
 * Asserts at the type level that a value has the specified type.
 * This function does not perform any checks at runtime.
 */
export function assertType<Type>(value: unknown): asserts value is Type {}
