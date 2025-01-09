import {attributesOptions} from 'autotests/constants';
import {createSelectorFunction} from 'e2ed/selectors';

import type {CreateSelector} from 'e2ed/types';

/**
 * Main function for creating selectors and working with selectors.
 */
export const createSelector: CreateSelector = createSelectorFunction(attributesOptions);
