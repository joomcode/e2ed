import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';

import type {FullTestRun, TestFilePath} from '../../types/internal';

/**
 * Assert that test names and file paths inside one retry are unique.
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUniqueInOneRetry = (
  fullTestRuns: readonly FullTestRun[],
): void => {
  const filePathsHash: Record<TestFilePath, FullTestRun> = {};
  const namesHash: Record<string, FullTestRun> = {};

  const unbrokenTestRuns = fullTestRuns.filter(({status}) => status !== TestRunStatus.Broken);

  for (const fullTestRun of unbrokenTestRuns) {
    const {filePath, name} = fullTestRun;

    assertValueIsFalse(filePath in filePathsHash, 'filePath is unique', {fullTestRun});
    assertValueIsFalse(name in namesHash, 'name is unique', {fullTestRun});

    filePathsHash[filePath] = fullTestRun;
    namesHash[name] = fullTestRun;
  }
};
