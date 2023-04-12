import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';

import type {FullTestRun, TestFilePath} from '../../types/internal';

/**
 * Asserts that test names and file paths inside one retry are unique.
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUniqueInOneRetry = (
  fullTestRuns: readonly FullTestRun[],
): void => {
  const filePathsHash: Record<TestFilePath, FullTestRun> = Object.create(null) as {};
  const namesHash: Record<string, FullTestRun> = Object.create(null) as {};

  const unbrokenTestRuns = fullTestRuns.filter(({status}) => status !== TestRunStatus.Broken);

  for (const fullTestRun of unbrokenTestRuns) {
    const {filePath, name} = fullTestRun;

    assertValueIsFalse(
      filePath in filePathsHash,
      'filePath is unique: each test should be in a separate file',
      {fullTestRun: cloneWithoutLogEvents(fullTestRun)},
    );
    assertValueIsFalse(name in namesHash, 'name is unique: each test must have a unique name', {
      fullTestRun: cloneWithoutLogEvents(fullTestRun),
    });

    filePathsHash[filePath] = fullTestRun;
    namesHash[name] = fullTestRun;
  }
};
