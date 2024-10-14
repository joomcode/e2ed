import {setCustomInspectOnFunction} from '../utils/fn';
import {generalLog} from '../utils/generalLog';
import {createSelectorCreator} from '../utils/selectors';

import type {CreateSelector, CreateSelectorFunctionOptions} from '../types/internal';

/**
 * Creates `createSelector` function.
 */
export const createSelectorFunction = ({
  getLocatorAttributeName,
}: CreateSelectorFunctionOptions): CreateSelector => {
  setCustomInspectOnFunction(getLocatorAttributeName);
  generalLog('Create selector functions', {getLocatorAttributeName});

  const createSelector = createSelectorCreator(getLocatorAttributeName);

  return createSelector;
};
