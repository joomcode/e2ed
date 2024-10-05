import {createSelectorFunctions} from 'e2ed/selectors';

/**
 * Main functions for creating selectors and working with selectors.
 */
export const {createSelector, createSelectorByCss, htmlElementSelector} = createSelectorFunctions({
  getLocatorAttributeName: (parameter) => {
    if (parameter === 'id') {
      return 'data-testid';
    }

    if (parameter === 'runhash') {
      return 'data-runhash';
    }

    return `data-test-${parameter}`;
  },
});
