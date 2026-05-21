import {readCompletedTestRuns} from '../fs';

import {getIsSuccessfulTestRun} from './getIsSuccessfulTestRun';

import type {TestFilePath} from '../../types/internal';

/**
 * Get array of test file paths of successful tests.
 * @internal
 */
export const getSuccessfulTestFilePaths = async (): Promise<readonly TestFilePath[]> => {
  const completedTestRuns = await readCompletedTestRuns();

  const successfulTestFilePaths: TestFilePath[] = [];

  for (const completedTestRun of completedTestRuns) {
    if (getIsSuccessfulTestRun(completedTestRun)) {
      successfulTestFilePaths.push(completedTestRun.filePath);
    }
  }

  return successfulTestFilePaths;
};
