import type {RawSelector, SelectorCustomMethods} from '../types/internal';

import type {CreateSelector} from './createSelector';

export const htmlElementSelectorCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  createSelector: CreateSelector<CustomMethods>,
): RawSelector<CustomMethods> =>
  /**
   * Selector of page HTML element ("documentElement").
   */
  createSelector('html');
