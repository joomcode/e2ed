import type {GetTestAttrNameFn, RawSelector, SelectorCustomMethods} from '../types/internal';

import type {CreateSelector} from './createSelector';

export const locatorIdSelectorCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  createSelector: CreateSelector<CustomMethods>,
  getTestAttrName: GetTestAttrNameFn,
): typeof locatorIdSelector => {
  /**
   * Selector of locator elements by locator id.
   */
  const locatorIdSelector = (id: string): RawSelector<CustomMethods> =>
    createSelector(`[${getTestAttrName('id')}="${id}"]`);

  return locatorIdSelector;
};
