import {getFullConfig} from 'e2ed/utils';

import type {TestStaticOptions} from 'e2ed/types';

/**
 * This is the type of the "skipTests" field in the e2ed config,
 * which describes the set of tests that need to be skipped.
 */
export type SkipTests = readonly string[];

/**
 * This hook is used to determine if a given test should be skipped.
 * Skipped tests are displayed in the html report with the corresponding "skipped" status.
 */
export const isTestSkipped = (testStaticOptions: TestStaticOptions): boolean => {
  // As with all hooks, you can replace it with your own implementation.
  const {options} = testStaticOptions;
  const {skipTests = []} = getFullConfig();

  return skipTests.includes(options.meta.testId);
};
