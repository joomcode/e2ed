import {getRunLabelObject} from '../runLabel';

import {assertThatTestNamesAndFilePathsAreUniqueInOneRetry} from './assertThatTestNamesAndFilePathsAreUniqueInOneRetry';

import type {TestRunWithHooks} from '../../types/internal';

/**
 * Assert that test names and file paths are unique (except of names internally retried runs).
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUnique = (
  testRunsWithHooks: readonly TestRunWithHooks[],
): void => {
  const testRunsByRunLabel: Record<string, TestRunWithHooks[]> = {};

  for (const testRunWithHooks of testRunsWithHooks) {
    const {retryIndex} = getRunLabelObject(testRunWithHooks.runLabel);

    if (!(retryIndex in testRunsByRunLabel)) {
      testRunsByRunLabel[retryIndex] = [];
    }

    testRunsByRunLabel[retryIndex]?.push(testRunWithHooks);
  }

  for (const testRunsInOneRetry of Object.values(testRunsByRunLabel)) {
    assertThatTestNamesAndFilePathsAreUniqueInOneRetry(testRunsInOneRetry);
  }
};
