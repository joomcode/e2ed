import {getFullConfig} from 'e2ed/utils';

import type {SkipTests, TestMeta} from 'autotests/types';
import type {IsTestSkipped, TestStaticOptions} from 'e2ed/types';

/**
 * This hook is used to determine if a given test should be skipped.
 * Skipped tests are displayed in the html report with the corresponding "skipped" status,
 * and with skip reason.
 */
export const isTestSkipped = (testStaticOptions: TestStaticOptions<TestMeta>): IsTestSkipped => {
  // As with all hooks, you can replace it with your own implementation.
  const {options} = testStaticOptions;
  const {skipTests = []} = getFullConfig<SkipTests>();

  if ('skipAll' in skipTests) {
    return {isSkipped: true, reason: skipTests.reason};
  }

  const group = skipTests.find(({testIds}) => testIds.includes(options.meta.testId));

  if (group) {
    return {isSkipped: true, reason: group.reason};
  }

  return {isSkipped: false};
};
