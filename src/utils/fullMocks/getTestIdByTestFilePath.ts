import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';

import {READ_FILE_OPTIONS} from '../../constants/internal';

import type {FullMocksTestId, TestFilePath} from '../../types/internal';

const fullMocksTestIdLength = 10;

/**
 * Get `testId` by `testFilePath`.
 * @internal
 */
export const getTestIdByTestFilePath = async (
  testFilePath: TestFilePath,
): Promise<FullMocksTestId> => {
  const testFileContent = await readFile(testFilePath, READ_FILE_OPTIONS);
  const hash = createHash('sha1');

  hash.update(testFileContent);

  const testId = hash.digest('base64url').slice(0, fullMocksTestIdLength) as FullMocksTestId;

  return testId;
};
