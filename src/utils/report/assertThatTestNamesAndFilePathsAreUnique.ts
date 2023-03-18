import {getRunLabelObject} from '../runLabel';

import {assertThatTestNamesAndFilePathsAreUniqueInOneRetry} from './assertThatTestNamesAndFilePathsAreUniqueInOneRetry';

import type {FullTestRun} from '../../types/internal';

/**
 * Asserts that test names and file paths are unique (except of names internally retried runs).
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUnique = (
  fullTestRuns: readonly FullTestRun[],
): void => {
  const testRunsByRetryIndex: Record<string, FullTestRun[]> = {};

  for (const fullTestRun of fullTestRuns) {
    const {retryIndex} = getRunLabelObject(fullTestRun.runLabel);

    if (!(retryIndex in testRunsByRetryIndex)) {
      testRunsByRetryIndex[retryIndex] = [];
    }

    testRunsByRetryIndex[retryIndex]?.push(fullTestRun);
  }

  for (const testRunsInOneRetry of Object.values(testRunsByRetryIndex)) {
    assertThatTestNamesAndFilePathsAreUniqueInOneRetry(testRunsInOneRetry);
  }
};
