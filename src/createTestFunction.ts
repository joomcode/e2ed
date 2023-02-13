import {setUserlandHooks} from './utils/userlandHooks';
import {test} from './test';

import type {TestFunction, UserlandConfig, UserlandHooks} from './types/internal';

type Options<TestMeta, SkipTests, CustomPackProperties> = Readonly<{
  config: UserlandConfig<SkipTests, CustomPackProperties>;
  hooks: UserlandHooks<TestMeta>;
}>;

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const createTestFunction = <TestMeta, SkipTests, CustomPackProperties>(
  options: Options<TestMeta, SkipTests, CustomPackProperties>,
): TestFunction<TestMeta> => {
  setUserlandHooks(options.hooks as UserlandHooks);

  return test as TestFunction<TestMeta>;
};
