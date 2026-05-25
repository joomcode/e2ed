import {writeGlobalError} from '../fs';

import {getIsTestOptionsDifferent} from './getIsTestOptionsDifferent';

import type {CompletedTestRun, TestStaticOptions} from '../../types/internal';

/**
 * Returns `true`, if new test file has uniq name in completed test runs,
 * otherwise writes global error.
 * @internal
 */
export const getIsTestNameUniq = async (
  testStaticOptions: TestStaticOptions,
  completedTestRuns: readonly CompletedTestRun[],
): Promise<boolean> => {
  const {filePath, name, options} = testStaticOptions;

  const testRunsWithName = completedTestRuns.filter((run) => run.name === name);

  for (const completedTestRun of testRunsWithName) {
    if (
      filePath !== completedTestRun.filePath ||
      getIsTestOptionsDifferent(options, completedTestRun.options)
    ) {
      await writeGlobalError(
        `There are two different tests with the same name "${name}": "${completedTestRun.filePath}" (${JSON.stringify(completedTestRun.options)}) and "${filePath}" (${JSON.stringify(options)})`,
      );

      return false;
    }
  }

  return true;
};
