import {RunEnvironment} from '../../configurator';

import {getUnvisitedTestFilePaths} from '../getUnvisitedTestFilePaths';

import type {TestRunWithHooks} from '../../types/internal';

/**
 * Get all report errors. General report status is failed if there is any error.
 * @internal
 */
export const getReportErrors = async (
  runEnvironment: RunEnvironment,
  testRunsWithHooks: readonly TestRunWithHooks[],
): Promise<readonly string[]> => {
  const errors: string[] = [];

  if (runEnvironment === RunEnvironment.Docker) {
    const unvisitedTestFilePaths = await getUnvisitedTestFilePaths(testRunsWithHooks);

    if (unvisitedTestFilePaths.length !== 0) {
      errors.push(
        `Error: There are e2ed/tests/**/*.spec.ts-files not visited when running tests: ${unvisitedTestFilePaths.join(
          ', ',
        )}`,
      );
    }
  }

  return errors;
};
