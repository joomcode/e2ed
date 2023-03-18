import {appendFile, readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {READ_FILE_OPTIONS, TMP_DIRECTORY_PATH} from '../constants/internal';

import {assertValueIsFalse} from './asserts';

import type {FilePathFromRoot, TestFilePath} from '../types/internal';

/**
 * Relative (from root) path to text file with list of not included in pack tests.
 * For each not included in pack test in this file, a relative path
 * to the file of this test is saved in a separate line.
 */
const NOT_INCLUDED_IN_PACK_TESTS_PATH = join(
  TMP_DIRECTORY_PATH,
  'notIncludedInPackTests.txt',
) as FilePathFromRoot;

/**
 * Get array of not included in pack tests.
 * @internal
 */
export const getNotIncludedInPackTests = async (): Promise<readonly TestFilePath[]> => {
  let textOfNotIncludedInPackTestsFile = '';

  try {
    textOfNotIncludedInPackTestsFile = await readFile(
      NOT_INCLUDED_IN_PACK_TESTS_PATH,
      READ_FILE_OPTIONS,
    );
  } catch {}

  return textOfNotIncludedInPackTestsFile
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean) as TestFilePath[];
};

/**
 * Add test to not included in pack tests.
 * @internal
 */
export const addTestToNotIncludedInPackTests = async (
  testFilePath: TestFilePath,
): Promise<void> => {
  const notIncludedInPackTests = await getNotIncludedInPackTests();

  assertValueIsFalse(
    notIncludedInPackTests.includes(testFilePath),
    'There is no duplicate test file path in not included in pack tests',
    {notIncludedInPackTests, testFilePath},
  );

  await appendFile(NOT_INCLUDED_IN_PACK_TESTS_PATH, `${testFilePath}\n`);
};
