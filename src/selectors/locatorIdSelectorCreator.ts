import type {
  CreateSelector,
  GetLocatorAttributeNameFn,
  LocatorIdSelector,
  Selector,
} from '../types/internal';

/**
 * Creates `locatorIdSelector` function.
 * @internal
 */
export const locatorIdSelectorCreator = (
  createSelector: CreateSelector,
  getLocatorAttributeName: GetLocatorAttributeNameFn,
): LocatorIdSelector => {
  /**
   * Selector of locator elements by locator id.
   */
  const locatorIdSelector = (id: string): Selector =>
    createSelector(`[${getLocatorAttributeName('id')}="${id}"]`);

  return locatorIdSelector;
};
