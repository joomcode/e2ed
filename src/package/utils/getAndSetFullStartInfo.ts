import {assertValueIsDefined, assertValueIsUndefined} from './asserts';

import type {FullStartInfo} from '../types/internal';

let fullStartInfo: FullStartInfo | undefined;

/**
 * Get run e2ed event (for report).
 * @internal
 */
export const getFullStartInfo = (): FullStartInfo => {
  assertValueIsDefined(fullStartInfo, 'fullStartInfo is defined');

  return fullStartInfo;
};

/**
 * Set run e2ed event (for report).
 * @internal
 */
export const setFullStartInfo = (info: FullStartInfo): void => {
  assertValueIsUndefined(fullStartInfo, 'fullStartInfo is undefined', {fullStartInfo});

  fullStartInfo = info;
};
