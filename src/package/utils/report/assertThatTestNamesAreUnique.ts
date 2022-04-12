import {getRunLabelObject} from '../runLabel';

import {assertThatTestNamesAreUniqueInOneRetry} from './assertThatTestNamesAreUniqueInOneRetry';

import type {TestRunWithHooks} from '../../types/internal';

/**
 * Assert that test names are unique (except of names internally retried runs).
 * @internal
 */
export const assertThatTestNamesAreUnique = (
  testRunsWithHooks: readonly TestRunWithHooks[],
): void => {
  const testRunsByRunLabel: Record<string, TestRunWithHooks[]> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    const {retryIndex} = getRunLabelObject(testRunWithHooks.runLabel);

    if (!(retryIndex in testRunsByRunLabel)) {
      testRunsByRunLabel[retryIndex] = [];
    }

    testRunsByRunLabel[retryIndex].push(testRunWithHooks);
  }

  for (const testRunsInOneRetry of Object.values(testRunsByRunLabel)) {
    assertThatTestNamesAreUniqueInOneRetry(testRunsInOneRetry);
  }
};
