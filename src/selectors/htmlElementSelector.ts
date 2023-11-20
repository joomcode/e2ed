import type {CreateSelector, Selector} from '../types/internal';

export const htmlElementSelectorCreator = (createSelector: CreateSelector): Selector =>
  /**
   * Selector of page HTML element ("documentElement").
   */
  createSelector('html');
