import {type ClearContext, type GetContext, type SetContext, useContext} from '../useContext';

import type {FrameLocator} from '@playwright/test';

const [get, set, clear] = useContext<FrameLocator>();

/**
 * Get frame context.
 */
export const getFrameContext: GetContext<FrameLocator> = get;

/**
 * Set frame context.
 */
export const setFrameContext: SetContext<FrameLocator> = set;

/**
 * Clear frame context.
 */
export const clearFrameContext: ClearContext = clear;
