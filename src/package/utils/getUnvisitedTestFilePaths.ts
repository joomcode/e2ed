import {TESTS_DIRECTORY_PATH} from '../constants/internal';

import {collectTestFilePathsFromDir} from './collectTestFilePathsFromDir';

import type {FullTestRun, TestFilePath} from '../types/internal';

/**
 * Get unvisited test file paths, that is, file paths to tests for which there was no test runs.
 * @internal
 */
export const getUnvisitedTestFilePaths = async (
  fullTestRuns: readonly FullTestRun[],
): Promise<readonly TestFilePath[]> => {
  const allTestFilePaths = await collectTestFilePathsFromDir(TESTS_DIRECTORY_PATH);

  const visitedTestFilePathsHash: Record<TestFilePath, true> = {};

  for (const {filePath} of fullTestRuns) {
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
