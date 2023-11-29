import type {Inner} from 'testcafe-without-typecheck';

import type {Expect} from './Expect';

/**
 * All assertion functions keys (names of assertion functions, like eql, match, etc).
 * @internal
 */
export type AssertionFunctionKey = keyof Inner.Assertion;

/**
 * Assertion function built in `Expect` class.
 * @internal
 */
export type AssertionFunction<Type> = (this: void, ...args: readonly unknown[]) => Type;

/**
 * Object with all assertion functions.
 * @internal
 */
export type AssertionFunctionsRecord<Type> = Readonly<
  Record<AssertionFunctionKey, AssertionFunction<Type>>
>;

/**
 * Method of `Expect` class.
 * @internal
 */
export type ExpectMethod = (this: Expect, ...args: readonly unknown[]) => Promise<unknown>;
