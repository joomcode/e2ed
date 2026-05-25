import {TestRunStatus} from '../../constants/internal';

import {assertValueIsFalse} from '../asserts';
import {cloneWithoutLogEvents} from '../clone';
import {writeGlobalError} from '../fs';

import type {FullTestRun, TestFilePath} from '../../types/internal';

/**
 * Asserts that test names and file paths inside one retry are unique.
 * @internal
 */
export const assertThatTestNamesAndFilePathsAreUniqueInOneRetry = async (
  fullTestRuns: readonly FullTestRun[],
): Promise<void> => {
  const filePathsHash: Record<TestFilePath, FullTestRun> = Object.create(null) as {};
  const namesHash: Record<string, FullTestRun> = Object.create(null) as {};

  const unbrokenTestRuns = fullTestRuns.filter(({status}) => status !== TestRunStatus.Broken);

  for (const fullTestRun of unbrokenTestRuns) {
    const {filePath, name} = fullTestRun;

    if (filePath in filePathsHash) {
      const firstTestString = JSON.stringify({
        name: (filePathsHash[filePath] as FullTestRun).name,
        options: filePathsHash[filePath]?.options,
      });

      const secondTestString = JSON.stringify({
        name: fullTestRun.name,
        options: fullTestRun.options,
      });

      await writeGlobalError(
        `The file "${filePath}" unexpectedly contains two different tests: ${firstTestString}, ${secondTestString}`,
      );
    }

    assertValueIsFalse(name in namesHash, 'name is unique: each test must have a unique name', {
      firstFullTestRun: cloneWithoutLogEvents(namesHash[name] as FullTestRun),
      secondFullTestRun: cloneWithoutLogEvents(fullTestRun),
    });

    filePathsHash[filePath] = fullTestRun;
    namesHash[name] = fullTestRun;
  }
};
