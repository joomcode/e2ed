import {writeGlobalError} from '../fs';

import {getIsTestOptionsDifferent} from './getIsTestOptionsDifferent';

import type {CompletedTestRun, TestStaticOptions} from '../../types/internal';

/**
 * Returns `true`, if new test file path is uniq in completed test runs,
 * otherwise writes global error.
 * @internal
 */
export const getIsTestFilePathUniq = async (
  testStaticOptions: TestStaticOptions,
  completedTestRuns: readonly CompletedTestRun[],
): Promise<boolean> => {
  const {filePath, name, options} = testStaticOptions;

  const testRunsWithFilePath = completedTestRuns.filter((run) => run.filePath === filePath);

  for (const completedTestRun of testRunsWithFilePath) {
    if (
      name !== completedTestRun.name ||
      getIsTestOptionsDifferent(options, completedTestRun.options)
    ) {
      await writeGlobalError(
        `The file "${filePath}" contains two different tests: "${completedTestRun.name}" (${JSON.stringify(completedTestRun.options)}) and "${name}" (${JSON.stringify(options)})`,
      );

      return false;
    }
  }

  return true;
};
