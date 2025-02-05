import {DESCRIPTION_KEY} from '../constants/internal';
import {generalLog} from '../utils/generalLog';
import {createCustomMethods, createGetTrap, Selector as SelectorClass} from '../utils/selectors';
import {setReadonlyProperty} from '../utils/setReadonlyProperty';

import type {CreateSelector, CreateSelectorFunctionOptions, Selector} from '../types/internal';

/**
 * Creates `createSelector` function.
 */
export const createSelectorFunction = (
  attributesOptions: CreateSelectorFunctionOptions,
): CreateSelector => {
  generalLog('Create selector function', {attributesOptions});

  const customMethods = createCustomMethods(attributesOptions);

  return (cssString) => {
    const selector = new SelectorClass(cssString) as unknown as Selector;

    setReadonlyProperty(selector, DESCRIPTION_KEY, cssString);

    return new Proxy(selector, {get: createGetTrap(customMethods)});
  };
};
