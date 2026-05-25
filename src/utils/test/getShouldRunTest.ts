import {
  getIsSuccessfulTestRun,
  getIsTestFilePathUniq,
  getIsTestNameUniq,
} from '../completedTestRuns';
import {readCompletedTestRuns, writeCompletedTestRun, writeNotIncludedInPackTest} from '../fs';
import {isUiMode} from '../uiMode';

import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';

import type {TestStaticOptions} from '../../types/internal';

/**
 * Returns `true`, if test should be run, and `false` otherwise.
 * Writes all running tests into the array of `CompletedTestRun`,
 * and checks the uniqueness of test file path and the uniqueness of test name.
 * @internal
 */
export const getShouldRunTest = async (testStaticOptions: TestStaticOptions): Promise<boolean> => {
  const isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

  if (!isTestIncludedInPack) {
    await writeNotIncludedInPackTest(testStaticOptions.filePath);

    return false;
  }

  if (isUiMode) {
    return true;
  }

  const completedTestRuns = await readCompletedTestRuns();

  await writeCompletedTestRun({...testStaticOptions, status: 'started'});

  const isTestFilePathUniq = await getIsTestFilePathUniq(testStaticOptions, completedTestRuns);

  if (isTestFilePathUniq === false) {
    return false;
  }

  const isTestNameUniq = await getIsTestNameUniq(testStaticOptions, completedTestRuns);

  if (isTestNameUniq === false) {
    return false;
  }

  for (const completedTestRun of completedTestRuns) {
    if (
      completedTestRun.filePath === testStaticOptions.filePath &&
      getIsSuccessfulTestRun(completedTestRun)
    ) {
      return false;
    }
  }

  return true;
};
