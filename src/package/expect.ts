import {Expect} from './utils/Expect';

export const expect = <V>(value: Promise<V>, description: string): Assertion<V> =>
  new Expect(value, description) as unknown as Assertion<V>;
