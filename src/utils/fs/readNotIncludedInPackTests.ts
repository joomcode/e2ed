import {readFile} from 'node:fs/promises';

import {NOT_INCLUDED_IN_PACK_TESTS_PATH, READ_FILE_OPTIONS} from '../../constants/internal';

import type {TestFilePath} from '../../types/internal';

/**
 * Reads array of not included in pack tests.
 * @internal
 */
export const readNotIncludedInPackTests = async (): Promise<readonly TestFilePath[]> => {
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
