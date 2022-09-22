import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

/**
 * Selector of locator elements (with data-testid attribute) by locator id.
 */
export const locatorIdSelector = (id: string): Selector => createSelector(`[data-testid='${id}']`);
