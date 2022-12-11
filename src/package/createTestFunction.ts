import {setUserlandHooks} from './utils/userlandHooks';
import {test} from './test';

import type {TestFunction, UserlandConfig, UserlandHooks} from './types/internal';

type Options<TestMeta, SkipTests> = Readonly<{
  config: UserlandConfig<SkipTests>;
  hooks: UserlandHooks<TestMeta>;
}>;

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const createTestFunction = <TestMeta, SkipTests>(
  options: Options<TestMeta, SkipTests>,
): TestFunction<TestMeta> => {
  setUserlandHooks(options.hooks as UserlandHooks);

  return test as TestFunction<TestMeta>;
};
