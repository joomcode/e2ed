import {createSelectorFunctions} from 'e2ed/selectors';

/**
 * Main functions for creating selectors and working with selectors.
 */
export const {createSelector, createSelectorByCss, locatorIdSelector, htmlElementSelector} =
  createSelectorFunctions({
    getLocatorAttributeName: (parameter) =>
      parameter === 'id' ? 'data-testid' : `data-test-${parameter}`,
  });
