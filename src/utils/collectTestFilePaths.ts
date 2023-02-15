import {normalize} from 'node:path';

import globby from 'globby';

import {getFullPackConfig} from './getFullPackConfig';

import type {TestFilePath} from '../types/internal';

/**
 * Collects test file paths for current pack.
 * @internal
 */
export const collectTestFilePaths = async (): Promise<readonly TestFilePath[]> => {
  const {testFileGlobs} = getFullPackConfig();

  const rawTestFilesPaths = await globby(testFileGlobs);
  const testFilesPaths = rawTestFilesPaths.map(normalize as (path: string) => TestFilePath);

  return testFilesPaths;
};
