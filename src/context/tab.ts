// eslint-disable-next-line import/no-internal-modules
import {useContext} from '../useContext/useContext';

import type {ClearContext, GetContext, SetContext, Tab} from '../types/internal';

const [get, set, clear] = useContext<Tab>();

/**
 * Get tab.
 * @internal
 */
export const getTab: GetContext<Tab> = get;

/**
 * Set tab.
 * @internal
 */
export const setTab: SetContext<Tab> = set;

/**
 * Clear tab.
 * @internal
 */
export const clearTab: ClearContext = clear;
