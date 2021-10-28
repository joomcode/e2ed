import {setRawMeta} from './context/meta';

import type {TestMeta} from './types';
import type {Inner} from 'testcafe-without-typecheck';

declare const fixture: Inner.FixtureFn;
declare const test: Inner.TestFn;

type Options = Readonly<{
  meta: TestMeta;
}>;

/**
 * Creates test with name, metatags, params and test function.
 */
export const it = (name: string, {meta}: Options, testFn: () => Promise<void>): void => {
  fixture('✔');

  test.before(() => {
    setRawMeta(meta);

    return Promise.resolve();
  })(name, testFn);
};
