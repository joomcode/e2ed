import {TESTS_DIRECTORY_PATH} from '../constants/internal';

import {collectTestFilePathsFromDir} from './collectTestFilePathsFromDir';

import type {TestFilePath, TestRunWithHooks} from '../types/internal';

/**
 * Get unvisited test file paths, that is, file paths to tests for which there was no test runs.
 * @internal
 */
export const getUnvisitedTestFilePaths = async (
  testRunsWithHooks: readonly TestRunWithHooks[],
): Promise<readonly TestFilePath[]> => {
  const allTestFilePaths = await collectTestFilePathsFromDir(TESTS_DIRECTORY_PATH);

  const visitedTestFilePathsHash: Record<TestFilePath, true> = {};

  for (const {filePath} of testRunsWithHooks) {
    visitedTestFilePathsHash[filePath] = true;
  }

  const unvisitedTestFilePaths: TestFilePath[] = [];

  for (const testFilePath of allTestFilePaths) {
    if (!(testFilePath in visitedTestFilePathsHash)) {
      unvisitedTestFilePaths.push(testFilePath);
    }
  }

  return unvisitedTestFilePaths;
};
