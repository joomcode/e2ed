import {createCustomMethods} from './createCustomMethods';
import {createSelectorByCssCreator} from './createSelectorByCssCreator';
import {createSelectorCreator} from './createSelectorCreator';
import {htmlElementSelectorCreator} from './htmlElementSelectorCreator';
import {locatorIdSelectorCreator} from './locatorIdSelectorCreator';

import type {
  CreateSelectorFunctionsOptions,
  GetLocatorAttributeNameFn,
  SelectorCustomMethods,
  SelectorFunctions,
} from '../types/internal';

const createSelectorFunctionsWithCustomMethods = (
  getLocatorAttributeName: GetLocatorAttributeNameFn,
  // force `this` to be Selector
  customMethods: SelectorCustomMethods,
): SelectorFunctions => {
  const createSelector = createSelectorCreator(customMethods);

  const selectorsWithCustomMethods = {
    /**
     * Creates selector by locator and optional parameters.
     */
    createSelector,
    /**
     * Creates selector of page elements by CSS selector.
     */
    createSelectorByCss: createSelectorByCssCreator(createSelector),
    /**
     * Selector of page HTML element ("documentElement").
     */
    htmlElementSelector: htmlElementSelectorCreator(createSelector),
    /**
     * Selector of locator elements by locator id.
     */
    locatorIdSelector: locatorIdSelectorCreator(createSelector, getLocatorAttributeName),
  };

  return selectorsWithCustomMethods;
};

/**
 * Creates main functions for creating selectors and working with selectors.
 */
export const createSelectorFunctions = ({
  getLocatorAttributeName,
}: CreateSelectorFunctionsOptions): SelectorFunctions =>
  createSelectorFunctionsWithCustomMethods(
    getLocatorAttributeName,
    createCustomMethods(getLocatorAttributeName),
  );
