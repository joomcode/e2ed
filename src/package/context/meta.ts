import {useContext} from '../useContext';
import {assertValueIsDefined, assertValueIsUndefined} from '../utils/asserts';

import type {TestMetaPlaceholder} from '../types/internal';

/**
 * Raw get and set test metadata functions.
 */
const [getRawMeta, setRawMeta] = useContext<TestMetaPlaceholder>();

/**
 * Get test metadata.
 */
export const getMeta = <TestMeta>(): TestMeta => {
  const meta = getRawMeta() as TestMeta;

  assertValueIsDefined(meta, 'meta is defined');

  return meta;
};

/**
 * Set test metadata.
 * @internal
 */
export const setMeta: typeof setRawMeta = (meta) => {
  const currentMeta = getRawMeta();

  assertValueIsUndefined(currentMeta, 'currentMeta is not defined', {meta});

  setRawMeta(meta);
};
