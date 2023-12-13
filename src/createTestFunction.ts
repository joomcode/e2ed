import {setUserlandHooks} from './utils/userland';
import {test} from './test';

import type {AnyPack, GetPackParameters, TestFunction, UserlandHooks} from './types/internal';

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const createTestFunction = <
  Pack extends AnyPack,
  TestMeta = GetPackParameters<Pack>['TestMeta'],
>(
  hooks: UserlandHooks<TestMeta>,
): TestFunction<TestMeta> => {
  setUserlandHooks(hooks as UserlandHooks);

  return test as TestFunction<TestMeta>;
};
