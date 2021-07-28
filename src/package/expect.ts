import {Expect} from './utils/Expect';

/**
 * Wraps a promised value to assertion for further checks.
 */
export const expect = <A>(actual: Promise<A>, description: string): Assertion<A> =>
  new Expect(actual, description) as unknown as Assertion<A>;
