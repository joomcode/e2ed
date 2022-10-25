import {normalize} from 'node:path';

import globby from 'globby';

import {getFullConfig} from './getFullConfig';

import type {TestFilePath} from '../types/internal';

/**
 * Collects test file paths for current pack.
 * @internal
 */
export const collectTestFilePaths = async (): Promise<readonly TestFilePath[]> => {
  const {testFiles} = getFullConfig();

  const rawTestFilesPaths = await globby(testFiles);
  const testFilesPaths = rawTestFilesPaths.map(normalize as (path: string) => TestFilePath);

  return testFilesPaths;
};
