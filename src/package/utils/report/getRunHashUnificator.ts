import {generalLog} from '../generalLog';
import {getKeysCounter} from '../getKeysCounter';

import type {RunHash} from '../../types/internal';

type RunHashUnificator = (maybeDuplicatedRunHash: RunHash) => {
  runHash: RunHash;
  duplicate: boolean;
};

/**
 * Get function that convert all test runs hashes to unique hashes.
 * @internal
 */
export const getRunHashUnificator = (): RunHashUnificator => {
  const hashesCounter = getKeysCounter();

  const runHashUnificator: RunHashUnificator = (maybeDuplicateRunHash) => {
    const clearRunHash = maybeDuplicateRunHash.replace(/[# ?:/]+/g, '-') as RunHash;

    const number = hashesCounter(clearRunHash);

    if (number === 1) {
      return {duplicate: false, runHash: clearRunHash};
    }

    generalLog('Duplicate test run hashes', {
      clearRunHash,
      number,
      rawRunHash: maybeDuplicateRunHash,
    });

    const runHash = `${clearRunHash}-r${number - 1}` as RunHash;

    return {duplicate: true, runHash};
  };

  return runHashUnificator;
};
