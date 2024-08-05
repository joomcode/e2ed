import {appendFile, readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {READ_FILE_OPTIONS, TMP_DIRECTORY_PATH} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

import type {FilePathFromRoot, TestFilePath} from '../../types/internal';

/**
 * Relative (from root) path to text file with list of successful tests.
 */
const SUCCESSFUL_TESTS_PATH = join(TMP_DIRECTORY_PATH, 'successfulTests.txt') as FilePathFromRoot;

/**
 * Get array of successful tests.
 * @internal
 */
export const getSuccessfulTestRuns = async (): Promise<readonly TestFilePath[]> => {
  let successfulTestsFile = '';

  try {
    successfulTestsFile = await readFile(SUCCESSFUL_TESTS_PATH, READ_FILE_OPTIONS);
  } catch {}

  return successfulTestsFile
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean) as TestFilePath[];
};

/**
 * Adds one successful test run (in current retry).
 * @internal
 */
export const addSuccessfulInCurrentRetry = async (testFilePath: TestFilePath): Promise<void> => {
  const successfulTestRuns = await getSuccessfulTestRuns();

  assertValueIsFalse(
    successfulTestRuns.includes(testFilePath),
    'There is no duplicate test file path in successful test runs',
    {successfulTestRuns, testFilePath},
  );

  await appendFile(SUCCESSFUL_TESTS_PATH, `${testFilePath}\n`);
};
