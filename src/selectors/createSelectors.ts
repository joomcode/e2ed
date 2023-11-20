import {createSelectorCreator} from './createSelector';
import {createSelectorByCssCreator} from './createSelectorByCss';
import {createCustomMethods} from './customMethods';
import {htmlElementSelectorCreator} from './htmlElementSelector';
import {locatorIdSelectorCreator} from './locatorIdSelector';

import type {
  CreateSelectorsOptions,
  GetLocatorAttributeNameFn,
  SelectorCustomMethods,
} from '../types/internal';

const createSelectorsWithCustomMethods = (
  getLocatorAttributeName: GetLocatorAttributeNameFn,
  // force `this` to be Selector
  customMethods: SelectorCustomMethods,
): typeof selectorsWithCustomMethods => {
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createSelectors = ({getLocatorAttributeName}: CreateSelectorsOptions) =>
  createSelectorsWithCustomMethods(
    getLocatorAttributeName,
    createCustomMethods(getLocatorAttributeName),
  );
