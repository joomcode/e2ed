import {getFullConfig} from 'e2ed/utils';

import type {IsTestSkipped, TestStaticOptions} from 'e2ed/types';

/**
 * Group of skipped tests, grouped by skip reason.
 */
type GroupOfSkippedTests = Readonly<{
  reason: string;
  testIds: readonly string[];
  unskipTaskUrl: string;
}>;

/**
 * This is the type of the "skipTests" field in the e2ed config,
 * which describes the set of tests that need to be skipped.
 */
export type SkipTests = Readonly<{reason: string; skipAll: true}> | readonly GroupOfSkippedTests[];

/**
 * This hook is used to determine if a given test should be skipped.
 * Skipped tests are displayed in the html report with the corresponding "skipped" status,
 * and with skip reason.
 */
export const isTestSkipped = (testStaticOptions: TestStaticOptions): IsTestSkipped => {
  // As with all hooks, you can replace it with your own implementation.
  const {options} = testStaticOptions;
  const {skipTests = []} = getFullConfig();

  if ('skipAll' in skipTests) {
    return {isSkipped: true, reason: skipTests.reason};
  }

  const group = skipTests.find(({testIds}) => testIds.includes(options.meta.testId));

  if (group) {
    return {isSkipped: true, reason: group.reason};
  }

  return {isSkipped: false};
};
