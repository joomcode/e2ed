import {createSelector} from '../createSelector';

import type {Selector} from '../types/internal';

/**
 * Creates selector of page elements by CSS selector.
 */
export const createSelectorByCss = (cssSelectorString: string): Selector =>
  createSelector(cssSelectorString);
