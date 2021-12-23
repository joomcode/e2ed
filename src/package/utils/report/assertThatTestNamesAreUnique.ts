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
    const runLabelString = String(testRunWithHooks.runLabel);

    if (!(runLabelString in testRunsByRunLabel)) {
      testRunsByRunLabel[runLabelString] = [];
    }

    testRunsByRunLabel[runLabelString].push(testRunWithHooks);
  }

  for (const testRunsInOneRetry of Object.values(testRunsByRunLabel)) {
    assertThatTestNamesAreUniqueInOneRetry(testRunsInOneRetry);
  }
};
