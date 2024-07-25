import type {Expect as PlaywrightExpect} from '@playwright/test';

import type {Expect} from './Expect';

type ElementOf<Type> = Type extends (infer Element)[] ? Element : never;

type EnsureString<Type> = Type extends string ? string : never;

type Extend<Type, Extended> = Type extends Extended ? Extended : never;

/**
 * Addition matchers.
 */
export type AdditionalMatchers<Actual> = Readonly<{
  contains: <R>(
    expected: ElementOf<Actual> | EnsureString<Actual> | Extend<Actual, R>,
  ) => Promise<void>;
  eql: (expected: Actual) => Promise<void>;
  gt: (expected: number) => Promise<void>;
  gte: (expected: number) => Promise<void>;
  lt: (expected: number) => Promise<void>;
  lte: (expected: number) => Promise<void>;
  match: (re: RegExp) => Promise<void>;
  notContains: <R>(
    unexpected: ElementOf<Actual> | EnsureString<Actual> | Extend<Actual, R>,
  ) => Promise<void>;
  notEql: (unexpected: Actual) => Promise<void>;
  notOk: () => Promise<void>;
  ok: () => Promise<void>;
}>;

/**
 * All assertion functions keys (names of assertion functions, like eql, match, etc).
 * @internal
 */
export type AssertionFunctionKey = keyof AdditionalMatchers<{}>;

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

/**
 * All matchers.
 */
// TODO: support LocatorAssertions, is Actual is a Selector
export type Matchers<Actual> = AdditionalMatchers<Actual> & ReturnType<PlaywrightExpect>;
