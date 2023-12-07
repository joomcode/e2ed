import {Expect} from './utils/expect';

import type {Inner} from 'testcafe-without-typecheck';

import type {IsEqual, Selector} from './types/internal';

/**
 * Wraps a value or promised value to assertion for further checks.
 */
export const expect = <Actual>(
  actual: IsEqual<Actual, Selector> extends true
    ? 'You should call some property or method on the selector'
    : Actual | Promise<Actual>,
  description: string,
): Inner.Assertion<Actual> => new Expect(actual, description) as unknown as Inner.Assertion<Actual>;
