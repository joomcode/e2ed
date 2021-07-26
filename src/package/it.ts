import {setRawMeta} from './context/meta';

import type {TestMeta} from './types';

type Options = Readonly<{
  meta: TestMeta;
}>;

export const it = (name: string, {meta}: Options, testFn: () => Promise<void>): void => {
  fixture('✔');

  test.before(() => {
    setRawMeta(meta);

    return Promise.resolve();
  })(name, testFn);
};
