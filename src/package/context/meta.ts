import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';
import {deepMerge} from '../utils/deepMerge';

import type {TestMeta} from '../types';
import type {DeepPartial} from '../types/internal';

export const [getRawMeta, setRawMeta] = useContext<TestMeta>();

/**
 * Get test metadata.
 */
export const getMeta = (): TestMeta => {
  const meta = getRawMeta();

  assertValueIsDefined(meta, 'meta is undefined');

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
