import {assertValueIsUndefined} from '../asserts';

import type {VisitedTestNamesHash} from '../../types/internal';

let visitedTestNamesHash: VisitedTestNamesHash | undefined;

/**
 * Get hash of names of already visited tests (maybe, in previous retries).
 * @internal
 */
export const getVisitedTestNamesHash = (): VisitedTestNamesHash | undefined => visitedTestNamesHash;

/**
 * Set hash of names of already visited tests (can only be called once).
 * @internal
 */
export const setVisitedTestNamesHash = (newVisitedTestNamesHash: VisitedTestNamesHash): void => {
  assertValueIsUndefined(visitedTestNamesHash, 'visitedTestNamesHash is not defined', {
    newVisitedTestNamesHash,
  });

  visitedTestNamesHash = newVisitedTestNamesHash;
};
