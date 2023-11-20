import type {CreateSelector, GetLocatorAttributeNameFn, Selector} from '../types/internal';

export const locatorIdSelectorCreator = (
  createSelector: CreateSelector,
  getTestAttrName: GetLocatorAttributeNameFn,
): typeof locatorIdSelector => {
  /**
   * Selector of locator elements by locator id.
   */
  const locatorIdSelector = (id: string): Selector =>
    createSelector(`[${getTestAttrName('id')}="${id}"]`);

  return locatorIdSelector;
};
