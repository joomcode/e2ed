import type {
  CreateSelector,
  GetTestAttributeNameFn,
  RawSelector,
  SelectorCustomMethods,
} from '../types/internal';

export const locatorIdSelectorCreator = <CustomMethods extends SelectorCustomMethods = {}>(
  createSelector: CreateSelector<CustomMethods>,
  getTestAttrName: GetTestAttributeNameFn,
): typeof locatorIdSelector => {
  /**
   * Selector of locator elements by locator id.
   */
  const locatorIdSelector = (id: string): RawSelector<CustomMethods> =>
    createSelector(`[${getTestAttrName('id')}="${id}"]`);

  return locatorIdSelector;
};
