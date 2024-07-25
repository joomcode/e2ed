import {getRunTest} from './utils/test';

import type {TestFunction} from './types/internal';

import {test as playwrightTest} from '@playwright/test';

/**
 * Creates test with name, metatags, options and test function.
 * @internal
 */
export const test: TestFunction = (name, options, testFn) => {
  const runTest = getRunTest({name, options, testFn});

  playwrightTest(name, runTest);
};
