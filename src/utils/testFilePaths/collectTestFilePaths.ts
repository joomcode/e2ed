import {glob} from 'node:fs/promises';
import {normalize} from 'node:path';

import {TESTS_DIRECTORY_PATH} from '../../constants/internal';

import {getFullPackConfig} from '../config';

import type {TestFilePath} from '../../types/internal';

/**
 * Collects all test file paths for current pack by test file globs
 * (includes tests that will be filtered by the `filterTestsIntoPack` function).
 * @internal
 */
export const collectTestFilePaths = async (): Promise<readonly TestFilePath[]> => {
  const {testFileGlobs} = getFullPackConfig();
  const rawTestFilesPaths: string[] = [];

  for await (const directory of glob(testFileGlobs as string[])) {
    rawTestFilesPaths.push(directory);
  }

  const testFilesPaths = rawTestFilesPaths
    .map(normalize as (path: string) => TestFilePath)
    .filter(
      (testFilePath) =>
        testFilePath.startsWith(TESTS_DIRECTORY_PATH) && !testFilePath.endsWith('.skip.ts'),
    );

  return testFilesPaths;
};
