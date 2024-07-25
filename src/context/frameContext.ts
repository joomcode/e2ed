import {useContext} from '../useContext';

import type {FrameLocator} from '@playwright/test';

/**
 * Get, set and clear frame context.
 */
export const [getFrameContext, setFrameContext, clearFrameContext] = useContext<FrameLocator>();
