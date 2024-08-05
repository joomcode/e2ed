import {getSuccessfulTestRuns} from '../generalLog';
import {addTestToNotIncludedInPackTests} from '../notIncludedInPackTests';

import {getIsTestIncludedInPack} from './getIsTestIncludedInPack';

import type {TestStaticOptions} from '../../types/internal';

/**
 * Returns `true`, if test should be run, and `false` otherwise.
 * @internal
 */
export const getShouldRunTest = async (testStaticOptions: TestStaticOptions): Promise<boolean> => {
  const isTestIncludedInPack = getIsTestIncludedInPack(testStaticOptions);

  if (!isTestIncludedInPack) {
    await addTestToNotIncludedInPackTests(testStaticOptions.filePath);

    return false;
  }

  const successfulTestRuns = await getSuccessfulTestRuns();

  return !successfulTestRuns.includes(testStaticOptions.filePath);
};
