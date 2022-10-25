import {RunEnvironment} from '../../configurator';

import {getFullConfig} from '../getFullConfig';
import {getUnvisitedTestFilePaths} from '../getUnvisitedTestFilePaths';

import type {FullTestRun} from '../../types/internal';

/**
 * Get all report errors. General report status is failed if there is any error.
 * @internal
 */
export const getReportErrors = async (
  runEnvironment: RunEnvironment,
  fullTestRuns: readonly FullTestRun[],
): Promise<readonly string[]> => {
  const {testFiles} = getFullConfig();
  const errors: string[] = [];

  if (runEnvironment === RunEnvironment.Docker) {
    const unvisitedTestFilePaths = await getUnvisitedTestFilePaths(fullTestRuns);
    const numberOfUnvisited = unvisitedTestFilePaths.length;
    const onlyOne = numberOfUnvisited === 1;

    if (numberOfUnvisited !== 0) {
      errors.push(
        `Error: There ${onlyOne ? 'is' : 'are'} ${numberOfUnvisited} test file${
          onlyOne ? '' : 's'
        } found by the globs "${testFiles.join(
          ', ',
        )}" and not visited when running tests: ${unvisitedTestFilePaths.join(', ')}`,
      );
    }
  }

  return errors;
};
