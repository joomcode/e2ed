import type {CreateSelector, GetLocatorAttributeNameFn, Selector} from '../types/internal';

export const locatorIdSelectorCreator = (
  createSelector: CreateSelector,
  getLocatorAttributeName: GetLocatorAttributeNameFn,
): typeof locatorIdSelector => {
  /**
   * Selector of locator elements by locator id.
   */
  const locatorIdSelector = (id: string): Selector =>
    createSelector(`[${getLocatorAttributeName('id')}="${id}"]`);

  return locatorIdSelector;
};
