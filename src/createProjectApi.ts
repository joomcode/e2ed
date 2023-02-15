import {getFullPackConfig} from './utils/getFullPackConfig';
import {setUserlandHooks} from './utils/userlandHooks';
import {test} from './test';

import type {
  AnyPack,
  GetFullPackConfig,
  GetPackParameters,
  TestFunction,
  UserlandHooks,
} from './types/internal';

type Return<Pack extends AnyPack> = Readonly<{
  getFullPackConfig: GetFullPackConfig<Pack>;
  test: TestFunction<GetPackParameters<Pack>['TestMeta']>;
}>;

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks), and getFullPackConfig function
 * that return the full pack configuration object.
 */
export const createProjectApi = <Pack extends AnyPack>(
  hooks: UserlandHooks<GetPackParameters<Pack>['TestMeta']>,
): Return<Pack> => {
  setUserlandHooks(hooks as UserlandHooks);

  return {
    getFullPackConfig: getFullPackConfig as GetFullPackConfig<Pack>,
    test: test as TestFunction<GetPackParameters<Pack>['TestMeta']>,
  };
};
