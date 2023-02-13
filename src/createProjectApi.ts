import {getFullPackConfig} from './utils/getFullPackConfig';
import {setUserlandHooks} from './utils/userlandHooks';
import {test} from './test';

import type {
  GetFullPackConfig,
  TestFunction,
  UserlandConfig,
  UserlandHooks,
} from './types/internal';

type Return<TestMeta, Pack extends UserlandConfig<unknown, unknown>> = Readonly<{
  getFullPackConfig: GetFullPackConfig<Pack>;
  test: TestFunction<TestMeta>;
}>;

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks), and getFullPackConfig function
 * that return the full pack configuration object.
 */
export const createProjectApi = <TestMeta, Pack extends UserlandConfig<unknown, unknown>>(
  hooks: UserlandHooks<TestMeta>,
): Return<TestMeta, Pack> => {
  setUserlandHooks(hooks as UserlandHooks);

  return {
    getFullPackConfig: getFullPackConfig as GetFullPackConfig<Pack>,
    test: test as TestFunction<TestMeta>,
  };
};
