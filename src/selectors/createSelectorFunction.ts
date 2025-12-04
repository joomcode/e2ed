import {generalLog} from '../utils/generalLog';
import {Selector} from '../utils/selectors';

import type {CreateSelector, CreateSelectorFunctionOptions} from '../types/internal';

/**
 * Creates `createSelector` function.
 */
export const createSelectorFunction = (
  attributesOptions: CreateSelectorFunctionOptions,
): CreateSelector => {
  generalLog('Create selector function', {attributesOptions});

  return (cssString) => Selector.create({cssString, ...attributesOptions});
};
