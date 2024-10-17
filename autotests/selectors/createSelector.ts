import {createSelectorFunction} from 'e2ed/selectors';

import type {CreateSelector} from 'e2ed/types';

/**
 * Main functions for creating selectors and working with selectors.
 */
export const createSelector: CreateSelector = createSelectorFunction({
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
