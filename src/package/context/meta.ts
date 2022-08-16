import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';
import {deepMerge} from '../utils/deepMerge';

import type {DeepPartial} from '../types/internal';
// eslint-disable-next-line import/no-restricted-paths
import type {TestMeta} from '../types/userland/types';

export const [getRawMeta, setRawMeta] = useContext<TestMeta>();

/**
 * Get test metadata.
 */
export const getMeta = (): TestMeta => {
  const meta = getRawMeta();

  assertValueIsDefined(meta, 'meta is defined');

  return meta;
};

/**
 * Set test metadata.
 */
export const setMeta = (partialMeta: DeepPartial<TestMeta>): void => {
  const meta = getMeta();
  const mergedMeta = deepMerge<TestMeta>(meta, partialMeta);

  setRawMeta(mergedMeta);
};
