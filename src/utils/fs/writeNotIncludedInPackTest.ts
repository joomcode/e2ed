import {appendFile} from 'node:fs/promises';

import {NOT_INCLUDED_IN_PACK_TESTS_PATH} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

import {readNotIncludedInPackTests} from './readNotIncludedInPackTests';

import type {TestFilePath} from '../../types/internal';

/**
 * Writes test to not included in pack tests.
 * @internal
 */
export const writeNotIncludedInPackTest = async (testFilePath: TestFilePath): Promise<void> => {
  const notIncludedInPackTests = await readNotIncludedInPackTests();

  assertValueIsFalse(
    notIncludedInPackTests.includes(testFilePath),
    'There is no duplicate test file path in not included in pack tests',
    {notIncludedInPackTests, testFilePath},
  );

  await appendFile(NOT_INCLUDED_IN_PACK_TESTS_PATH, `${testFilePath}\n`);
};
