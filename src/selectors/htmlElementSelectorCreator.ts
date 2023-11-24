import type {CreateSelector, Selector} from '../types/internal';

/**
 * Creates selector of page HTML element ("documentElement").
 * @internal
 */
export const htmlElementSelectorCreator = (createSelector: CreateSelector): Selector =>
  createSelector('html');
