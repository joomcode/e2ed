import {useContext} from '../useContext';

import type {TestMeta} from '../types';

const [getRawMeta, setRawMeta] = useContext<TestMeta>();

/**
 * Get test metadata.
 */
export const getMeta = (): TestMeta => getRawMeta() || {};

/**
 * Set test metadata.
 */
export const setMeta = (partialMeta: Partial<TestMeta>): void => {
  const meta = getRawMeta();

  setRawMeta({...meta, ...partialMeta});
};
