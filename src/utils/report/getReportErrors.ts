import {getFullPackConfig} from '../config';
import {readGlobalErrors, readGlobalWarnings} from '../fs';
import {
  collectTestFilePaths,
  getUnsuccessfulTestFilePaths,
  getUnvisitedTestFilePaths,
} from '../testFilePaths';

import type {FullTestRun, TestFilePath} from '../../types/internal';

type Return = Readonly<{
  errors: readonly string[];
  warnings: readonly string[];
}>;

/**
 * Get all report errors and warnings. General report status is failed if there is any error.
 * @internal
 */
export const getReportErrors = async (
  fullTestRuns: readonly FullTestRun[],
  notIncludedInPackTests: readonly TestFilePath[],
): Promise<Return> => {
  const {testFileGlobs} = getFullPackConfig();
  const errors = (await readGlobalErrors()) as string[];
  const warnings = await readGlobalWarnings();

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

  return {errors, warnings};
};
