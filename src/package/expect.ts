import {Expect} from './utils/Expect';

/**
 * Wraps a promised value to assertion for further checks.
 */
export const expect = <V>(value: Promise<V>, description: string): Assertion<V> =>
  new Expect(value, description) as unknown as Assertion<V>;
