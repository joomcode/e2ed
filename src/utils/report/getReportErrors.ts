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
  const {testFileGlobs} = getFullConfig();
  const errors: string[] = [];

  if (runEnvironment === RunEnvironment.Docker) {
    const unvisitedTestFilePaths = await getUnvisitedTestFilePaths(fullTestRuns);
    const numberOfUnvisited = unvisitedTestFilePaths.length;
    const thereAreManyUnvisitedFiles = numberOfUnvisited > 1;
    const wordFile = thereAreManyUnvisitedFiles ? 'files' : 'file';
    const wordGlob = testFileGlobs.length > 1 ? 'globs' : 'glob';

    if (numberOfUnvisited !== 0) {
      errors.push(
        `Error: There ${
          thereAreManyUnvisitedFiles ? 'are' : 'is'
        } ${numberOfUnvisited} test ${wordFile} found by the ${wordGlob} "${testFileGlobs.join(
          ', ',
        )}" and not visited when running tests: ${unvisitedTestFilePaths.join(', ')}`,
      );
    }
  }

  return errors;
};
