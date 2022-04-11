import {join, sep} from 'node:path';

import {TESTS_DIRECTORY_PATH} from '../constants/internal';

import {E2EDError} from './E2EDError';

import type {TestFilePath} from '../types/internal';

const testPathString = join(TESTS_DIRECTORY_PATH, sep);

/**
 * Get the path to the test file relative to the directory with all tests,
 * from the absolute or relative path containing the directory with all tests.
 * @internal
 */
export const getRelativeTestFilePath = (filePath: string): TestFilePath => {
  const index = filePath.lastIndexOf(testPathString);

  if (index === -1) {
    throw new E2EDError('Not a path to test file', {filePath});
  }

  return filePath.slice(index + testPathString.length) as TestFilePath;
};
