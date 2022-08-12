import {getRunLabelObject} from '../runLabel';

import {assertThatTestNamesAndFilePathsAreUniqueInOneRetry} from './assertThatTestNamesAndFilePathsAreUniqueInOneRetry';

import type {FullTestRun} from '../../types/internal';

/**
 * Assert that test names and file paths are unique (except of names internally retried runs).
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUnique = (
  fullTestRuns: readonly FullTestRun[],
): void => {
  const testRunsByRunLabel: Record<string, FullTestRun[]> = {};

  for (const fullTestRun of fullTestRuns) {
    const {retryIndex} = getRunLabelObject(fullTestRun.runLabel);

    if (!(retryIndex in testRunsByRunLabel)) {
      testRunsByRunLabel[retryIndex] = [];
    }

    testRunsByRunLabel[retryIndex]?.push(fullTestRun);
  }

  for (const testRunsInOneRetry of Object.values(testRunsByRunLabel)) {
    assertThatTestNamesAndFilePathsAreUniqueInOneRetry(testRunsInOneRetry);
  }
};
