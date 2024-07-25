import {DESCRIPTION_KEY} from '../../constants/internal';

import {setReadonlyProperty} from '../setReadonlyProperty';

import {createCustomMethods} from './createCustomMethods';
import {createGetTrap} from './createGetTrap';
import {Selector as SelectorClass} from './Selector';

import type {CreateSelector, GetLocatorAttributeNameFn, Selector} from '../../types/internal';

/**
 * Creates `createSelector` function.
 * @internal
 */
export const createSelectorCreator = (
  getLocatorAttributeName: GetLocatorAttributeNameFn,
): CreateSelector => {
  const customMethods = createCustomMethods(getLocatorAttributeName);

  const createSelector: CreateSelector = (locator) => {
    const selector = new SelectorClass(locator) as unknown as Selector;

    setReadonlyProperty(selector, DESCRIPTION_KEY, locator);

    return new Proxy(selector, {get: createGetTrap(customMethods)});
  };

  return createSelector;
};
