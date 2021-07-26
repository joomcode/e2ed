import {useContext} from '../useContext';
import {assertValueIsDefined} from '../utils/asserts';

import type {TestMeta} from '../types';

export const [getRawMeta, setRawMeta] = useContext<TestMeta>();

/**
 * Get test metadata.
 */
export const getMeta = (): TestMeta => {
  const meta = getRawMeta();

  assertValueIsDefined(meta);

  return meta;
};

/**
 * Set test metadata.
 */
export const setMeta = (partialMeta: Partial<TestMeta>): void => {
  const meta = getMeta();

  setRawMeta({...meta, ...partialMeta});
};
