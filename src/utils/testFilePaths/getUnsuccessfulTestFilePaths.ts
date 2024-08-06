import {assertValueIsFalse, assertValueIsTrue} from '../asserts';
import {getSuccessfulTestFilePaths} from '../generalLog';

import type {TestFilePath} from '../../types/internal';

/**
 * Get unsuccessful test file paths, that is, file paths that are not successful and included in pack.
 * @internal
 */
export const getUnsuccessfulTestFilePaths = async (
  allTestFilePaths: readonly TestFilePath[],
  notIncludedInPackTests: readonly TestFilePath[],
): Promise<readonly TestFilePath[]> => {
  const successfulTestFilePaths = await getSuccessfulTestFilePaths();

  const successfulAndNotIncludedTestFilePathsHash = Object.create(null) as Record<
    TestFilePath,
    true
  >;

  for (const filePath of successfulTestFilePaths) {
    successfulAndNotIncludedTestFilePathsHash[filePath] = true;
  }

  for (const filePath of notIncludedInPackTests) {
    assertValueIsFalse(
      filePath in successfulAndNotIncludedTestFilePathsHash,
      'There is no intersection between successful tests and not included in pack tests',
      {filePath, notIncludedInPackTests, successfulAndNotIncludedTestFilePathsHash},
    );

    successfulAndNotIncludedTestFilePathsHash[filePath] = true;
  }

  const allTestFilePathsHash = Object.create(null) as Record<TestFilePath, true>;

  for (const filePath of allTestFilePaths) {
    allTestFilePathsHash[filePath] = true;
  }

  // eslint-disable-next-line guard-for-in
  for (const filePath in successfulAndNotIncludedTestFilePathsHash) {
    assertValueIsTrue(
      filePath in allTestFilePathsHash,
      'filePath included in allTestFilePathsHash',
      {allTestFilePathsHash, filePath},
    );
  }

  const unsuccessfulTestFilePaths: TestFilePath[] = [];

  for (const filePath of allTestFilePaths) {
    if (!(filePath in successfulAndNotIncludedTestFilePathsHash)) {
      unsuccessfulTestFilePaths.push(filePath);
    }
  }

  return unsuccessfulTestFilePaths;
};
