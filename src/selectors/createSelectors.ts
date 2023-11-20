import {createSelectorCreator} from './createSelector';
import {createSelectorByCssCreator} from './createSelectorByCss';
import {createDefaultCustomMethods} from './defaultCustomMethods';
import {htmlElementSelectorCreator} from './htmlElementSelector';
import {locatorIdSelectorCreator} from './locatorIdSelector';

import type {
  CreateSelectorsOptions,
  GetTestAttributeNameFn,
  SelectorCustomMethods,
} from '../types/internal';

const createSelectorsWithCustomMethods = <CustomMethods extends SelectorCustomMethods = {}>(
  getTestAttributeName: GetTestAttributeNameFn,
  // force `this` to be Selector
  customMethods?: CustomMethods,
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
    locatorIdSelector: locatorIdSelectorCreator(createSelector, getTestAttributeName),
  };

  return selectorsWithCustomMethods;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createSelectors = ({getTestAttributeName}: CreateSelectorsOptions) =>
  createSelectorsWithCustomMethods(
    getTestAttributeName,
    createDefaultCustomMethods(getTestAttributeName),
  );
