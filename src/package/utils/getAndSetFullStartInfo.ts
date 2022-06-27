import {assertValueIsDefined, assertValueIsTrue} from './asserts';

import type {FullStartInfo} from '../types/internal';

let fullStartInfo: FullStartInfo | undefined;

/**
 * Get run e2ed event (for report).
 * @internal
 */
export const getFullStartInfo = (): FullStartInfo => {
  assertValueIsDefined(fullStartInfo, 'fullStartInfo is undefined');

  return fullStartInfo;
};

/**
 * Set run e2ed event (for report).
 * @internal
 */
export const setFullStartInfo = (info: FullStartInfo): void => {
  assertValueIsTrue(fullStartInfo === undefined, 'fullStartInfo is defined', {fullStartInfo});

  fullStartInfo = info;
};
