import {getKeysCounter} from '../getKeysCounter';

import type {RunHash} from '../../types/internal';

type RunHashUnificator = (maybeDuplicatedRunHash: RunHash) => RunHash;

/**
 * Get function that convert all test runs hashes to unique hashes.
 * @internal
 */
export const getRunHashUnificator = (): RunHashUnificator => {
  const hashesCounter = getKeysCounter();

  return (maybeDuplicatedRunHash: RunHash): RunHash => {
    const clearRunHash = maybeDuplicatedRunHash.replace(/[# ?:/]+/g, '-') as RunHash;

    const number = hashesCounter(clearRunHash);

    if (number === 1) {
      return clearRunHash;
    }

    return `${clearRunHash}-r${number - 1}` as RunHash;
  };
};
