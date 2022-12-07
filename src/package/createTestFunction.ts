import {setUserlandHooks} from './utils/userlandHooks';
import {test} from './test';

import type {UserlandConfig, UserlandHooks} from './types/internal';

type Options = Readonly<{
  config: UserlandConfig;
  hooks: UserlandHooks;
}>;

/**
 * Creates a test function that describes the test or the task
 * (test does not necessarily contain checks).
 */
export const createTestFunction = (options: Options): typeof test => {
  setUserlandHooks(options.hooks);

  return test;
};
