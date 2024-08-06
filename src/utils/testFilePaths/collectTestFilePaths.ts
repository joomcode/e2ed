import {normalize} from 'node:path';

import globby from 'globby';

import {getFullPackConfig} from '../config';

import type {TestFilePath} from '../../types/internal';

/**
 * Collects all test file paths for current pack by test file globs
 * (includes tests that will be filtered by the `filterTestsIntoPack` function).
 * @internal
 */
export const collectTestFilePaths = async (): Promise<readonly TestFilePath[]> => {
  const {testFileGlobs} = getFullPackConfig();

  const rawTestFilesPaths = await globby(testFileGlobs);
  const testFilesPaths = rawTestFilesPaths
    .map(normalize as (path: string) => TestFilePath)
    .filter((testFilePath) => !testFilePath.endsWith('.skip.ts'));

  return testFilesPaths;
};
