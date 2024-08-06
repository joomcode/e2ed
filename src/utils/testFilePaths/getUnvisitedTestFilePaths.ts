import {assertValueIsFalse} from '../asserts';

import type {FullTestRun, TestFilePath} from '../../types/internal';

/**
 * Get unvisited test file paths, that is, file paths to tests for which there was no test runs.
 * @internal
 */
export const getUnvisitedTestFilePaths = (
  fullTestRuns: readonly FullTestRun[],
  allTestFilePaths: readonly TestFilePath[],
  notIncludedInPackTests: readonly TestFilePath[],
): readonly TestFilePath[] => {
  const visitedTestFilePathsHash = Object.create(null) as Record<TestFilePath, true>;

  for (const {filePath} of fullTestRuns) {
    visitedTestFilePathsHash[filePath] = true;
  }

  for (const filePath of notIncludedInPackTests) {
    assertValueIsFalse(
      filePath in visitedTestFilePathsHash,
      'There is no duplicate test file path in included and not included in pack tests',
      {filePath, notIncludedInPackTests},
    );

    visitedTestFilePathsHash[filePath] = true;
  }

  const unvisitedTestFilePaths: TestFilePath[] = [];

  for (const filePath of allTestFilePaths) {
    if (!(filePath in visitedTestFilePathsHash)) {
      unvisitedTestFilePaths.push(filePath);
    }
  }

  return unvisitedTestFilePaths;
};
