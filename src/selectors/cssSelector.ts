import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

/**
 * Selector of page elements by CSS selectors.
 */
export const cssSelector = (cssSelectorString: string): Selector =>
  createSelector(cssSelectorString);
