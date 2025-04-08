import {Expect, type NonSelectorMatchers, type SelectorMatchers} from './utils/expect';

import type {IsEqual, Selector} from './types/internal';

type ExpectFunction = SelectorExpect & NotSelectorExpect;

type NotSelectorExpect = <Actual>(
  this: void,
  actual: IsEqual<Actual, Selector> extends true
    ? 'You should call some property or method on the selector'
    : Actual | Promise<Actual>,
  description: string,
) => NonSelectorMatchers<Actual>;

type SelectorExpect = (this: void, actual: Selector, description: string) => SelectorMatchers;

/**
 * Wraps a value or promised value to assertion for further checks.
 */
export const expect = ((actual: unknown, description: string) =>
  new Expect(actual, description)) as unknown as ExpectFunction;
