import {Expect} from './utils/expect';

import type {Inner} from 'testcafe-without-typecheck';

/**
 * Wraps a promised value to assertion for further checks.
 */
export const expect = <A>(actual: A | Promise<A>, description: string): Inner.Assertion<A> =>
  new Expect(actual, description) as unknown as Inner.Assertion<A>;
