import type {Inner} from 'testcafe-without-typecheck';

/**
 * All assertion functions keys (names of assertion functions, like eql, match, etc).
 * @internal
 */
export type AssertionFunctionKeys = keyof Inner.Assertion;

/**
 * Object with all assertion functions.
 * @internal
 */
export type AssertionFunctions<T> = Readonly<
  Record<AssertionFunctionKeys, (...args: unknown[]) => T>
>;
