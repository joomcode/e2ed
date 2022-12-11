import {relative} from 'node:path';

import {ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY} from '../constants/internal';

import {E2edError} from './E2edError';

import type {TestFilePath} from '../types/internal';

/**
 * Get the path to the test file relative to the project root directory,
 * from the absolute path to the test file.
 * @internal
 */
export const getRelativeTestFilePath = (absoluteFilePath: string): TestFilePath => {
  const testFilePath = relative(
    ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
    absoluteFilePath,
  ) as TestFilePath;

  if (testFilePath.startsWith('.')) {
    throw new E2edError('Not a path to project file', {absoluteFilePath, testFilePath});
  }

  return testFilePath;
};
