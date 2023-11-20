import type {CreateSelector, RawSelector, SelectorCustomMethods} from '../types/internal';

export const htmlElementSelectorCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  createSelector: CreateSelector<CustomMethods>,
): RawSelector<CustomMethods> =>
  /**
   * Selector of page HTML element ("documentElement").
   */
  createSelector('html');
