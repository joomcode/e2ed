import {RunEnvironment} from '../../configurator';

import {getFullPackConfig} from '../config';
import {
  collectTestFilePaths,
  getUnsuccessfulTestFilePaths,
  getUnvisitedTestFilePaths,
} from '../testFilePaths';

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
    const allTestFilePaths = await collectTestFilePaths();
    const unsuccessfulTestFilePaths = await getUnsuccessfulTestFilePaths(
      allTestFilePaths,
      notIncludedInPackTests,
    );
    const unvisitedTestFilePaths = getUnvisitedTestFilePaths(
      fullTestRuns,
      allTestFilePaths,
      notIncludedInPackTests,
    );
    const unsuccessfulCount = unsuccessfulTestFilePaths.length;
    const unvisitedCount = unvisitedTestFilePaths.length;
    const thereAreManyUnsuccessfulFiles = unsuccessfulCount > 1;
    const thereAreManyUnvisitedFiles = unvisitedCount > 1;
    const wordTest = thereAreManyUnsuccessfulFiles ? 'tests' : 'test';
    const wordFile = thereAreManyUnvisitedFiles ? 'files' : 'file';
    const wordGlob = testFileGlobs.length > 1 ? 'globs' : 'glob';

    if (unsuccessfulCount !== 0) {
      errors.push(
        `Error: There ${
          thereAreManyUnsuccessfulFiles ? 'are' : 'is'
        } ${unsuccessfulCount} unsuccessful ${wordTest}: ${unsuccessfulTestFilePaths.join(', ')}`,
      );
    }

    if (unvisitedCount !== 0) {
      errors.push(
        `Error: There ${
          thereAreManyUnvisitedFiles ? 'are' : 'is'
        } ${unvisitedCount} test ${wordFile} found by the ${wordGlob} "${testFileGlobs.join(
          ', ',
        )}" and not visited when running tests: ${unvisitedTestFilePaths.join(', ')}`,
      );
    }
  }

  return errors;
};
