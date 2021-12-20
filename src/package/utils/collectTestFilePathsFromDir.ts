import {readdir, stat} from 'fs/promises';
import {join} from 'path';

import {getRelativeTestFilePath} from './getRelativeTestFilePath';

import type {DirectoryPathFromRoot, TestFilePath} from '../types/internal';

/**
 * Recursive collect test file paths from directory.
 * @internal
 */
export const collectTestFilePathsFromDir = async (
  directoryPath: DirectoryPathFromRoot,
): Promise<readonly TestFilePath[]> => {
  const filesOrDirsNames = await readdir(directoryPath);
  const testFilesPaths: TestFilePath[] = [];

  for (const fileOrDirName of filesOrDirsNames) {
    const fileOrDirPath = join(directoryPath, fileOrDirName);

    if (fileOrDirPath.endsWith('.spec.ts')) {
      const testFilePath = getRelativeTestFilePath(fileOrDirPath);

      testFilesPaths.push(testFilePath);
    } else {
      const stats = await stat(fileOrDirPath);

      if (stats.isDirectory()) {
        const childDirectoryPath = fileOrDirPath as DirectoryPathFromRoot;

        const childTestFilesPaths = await collectTestFilePathsFromDir(childDirectoryPath);

        testFilesPaths.push(...childTestFilesPaths);
      }
    }
  }

  return testFilesPaths;
};
