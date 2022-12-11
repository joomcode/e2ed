import {assertValueIsDefined} from '../asserts';

import type {FullTestRun, RunHash} from '../../types/internal';

/**
 * Unificate all TestRun hashes at once.
 * @internal
 */
export const unificateRunHashes = (fullTestRuns: readonly FullTestRun[]): void => {
  const {length} = String(fullTestRuns.length - 1);

  for (let index = 0; index < fullTestRuns.length; index += 1) {
    const fullTestRun = fullTestRuns[index];

    assertValueIsDefined(fullTestRun, 'fullTestRun is defined', {index, length});

    const {runHash} = fullTestRun;

    const clearRunHash = runHash.replace(/[# ?:/]+/g, '-') as RunHash;

    const uniqueRunHash = `${clearRunHash}-${String(index).padStart(length, '0')}` as RunHash;

    (fullTestRun as {runHash: RunHash}).runHash = uniqueRunHash;
  }
};
