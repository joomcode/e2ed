import {readFile} from 'node:fs/promises';

import {READ_FILE_OPTIONS} from '../../constants/internal';
import {getHash} from '../../generators/internal';

import type {FullMocksTestId, TestFilePath} from '../../types/internal';

/**
 * Get `testId` by `testFilePath`.
 * @internal
 */
export const getTestIdByTestFilePath = async (
  testFilePath: TestFilePath,
): Promise<FullMocksTestId> => {
  const testFileContent = await readFile(testFilePath, READ_FILE_OPTIONS);
  const testId = getHash(testFileContent) as FullMocksTestId;

  return testId;
};
