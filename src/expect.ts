import {Expect} from './utils/expect';

import type {Inner} from 'testcafe-without-typecheck';

/**
 * Wraps a promised value to assertion for further checks.
 */
export const expect = <Actual>(
  actual: Actual | Promise<Actual>,
  description: string,
): Inner.Assertion<Actual> => new Expect(actual, description) as unknown as Inner.Assertion<Actual>;
