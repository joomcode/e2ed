import {setCustomInspectOnFunction} from '../utils/fn';
import {generalLog} from '../utils/generalLog';
import {
  createSelectorByCssCreator,
  createSelectorCreator,
  htmlElementSelectorCreator,
  locatorIdSelectorCreator,
} from '../utils/selectors';

import type {CreateSelectorFunctionsOptions, SelectorFunctions} from '../types/internal';

/**
 * Creates main functions for creating selectors and working with selectors.
 */
export const createSelectorFunctions = ({
  getLocatorAttributeName,
}: CreateSelectorFunctionsOptions): SelectorFunctions => {
  setCustomInspectOnFunction(getLocatorAttributeName);
  generalLog('Create selector functions', {getLocatorAttributeName});

  const createSelector = createSelectorCreator(getLocatorAttributeName);

  return {
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
};
