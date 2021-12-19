import {E2EDError} from '../E2EDError';
import {getKeysCounter} from '../getKeysCounter';

import type {RunHash} from '../../types/internal';

const hashesCounter = getKeysCounter();

/**
 * Sanitize test run hash and assert that run hash is unique for all test runs.
 * @internal
 */
export const sanitizeRunHash = (maybeDuplicateRunHash: RunHash): RunHash => {
  const sanitizedRunHash = maybeDuplicateRunHash.replace(/[# ?:/]+/g, '-') as RunHash;

  const number = hashesCounter(sanitizedRunHash);

  if (number === 1) {
    return sanitizedRunHash;
  }

  throw new E2EDError('Duplicate test run hashes', {
    number,
    rawRunHash: maybeDuplicateRunHash,
    sanitizedRunHash,
  });
};
