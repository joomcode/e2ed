import {RunEnvironment} from '../../configurator';

import {getFullPackConfig} from '../config';
import {getUnvisitedTestFilePaths} from '../getUnvisitedTestFilePaths';

import type {FullTestRun, TestFilePath} from '../../types/internal';

/**
 * Get all report errors. General report status is failed if there is any error.
 * @internal
 */
export const getReportErrors = async (
  runEnvironment: RunEnvironment,
  fullTestRuns: readonly FullTestRun[],
  notIncludedInPackTests: readonly TestFilePath[],
): Promise<readonly string[]> => {
  const {testFileGlobs} = getFullPackConfig();
  const errors: string[] = [];

  if (runEnvironment === RunEnvironment.Docker) {
    const unvisitedTestFilePaths = await getUnvisitedTestFilePaths(
      fullTestRuns,
      notIncludedInPackTests,
    );
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
