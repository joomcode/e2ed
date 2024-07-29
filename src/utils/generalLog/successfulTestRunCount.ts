import {appendFile, readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {READ_FILE_OPTIONS, TMP_DIRECTORY_PATH} from '../../constants/internal';

import type {FilePathFromRoot, TestFilePath} from '../../types/internal';

/**
 * Relative (from root) path to text file with list of not included in pack tests.
 * For each not included in pack test in this file, a relative path
 * to the file of this test is saved in a separate line.
 */
const SUCCESSFUL_TESTS_PATH = join(TMP_DIRECTORY_PATH, 'successfulTests.txt') as FilePathFromRoot;

/**
 * Adds one successful test run (in current retry).
 * @internal
 */
export const addSuccessfulInCurrentRetry = async (filePath: TestFilePath): Promise<void> => {
  await appendFile(SUCCESSFUL_TESTS_PATH, `${filePath}\n`);
};

/**
 * Get the number of tests successful for printing (total and in the current retry).
 * @internal
 */
export const getSuccessfulTestRunCount = async (): Promise<number> => {
  let successfulTestsFile = '';

  try {
    successfulTestsFile = await readFile(SUCCESSFUL_TESTS_PATH, READ_FILE_OPTIONS);
  } catch {}

  if (successfulTestsFile === '') {
    return 0;
  }

  return successfulTestsFile.split('\n').filter(Boolean).length;
};
