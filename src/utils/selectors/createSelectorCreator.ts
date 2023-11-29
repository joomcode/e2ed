import {Selector as TestCafeSelector} from 'testcafe-without-typecheck';

import {DESCRIPTION_KEY} from '../../constants/internal';

import {setReadonlyProperty} from '../setReadonlyProperty';

import {createCustomMethods} from './createCustomMethods';
import {createGetTrap} from './createGetTrap';

import type {CreateSelector, GetLocatorAttributeNameFn, Selector} from '../../types/internal';

/**
 * Creates `createSelector` function.
 * @internal
 */
export const createSelectorCreator = (
  getLocatorAttributeName: GetLocatorAttributeNameFn,
): CreateSelector => {
  const customMethods = createCustomMethods(getLocatorAttributeName);

  const createSelector: CreateSelector = (...args) => {
    const locator = args[0];
    const selector = TestCafeSelector(...args) as unknown as Selector;

    if (typeof locator === 'string') {
      setReadonlyProperty(selector, DESCRIPTION_KEY, locator);
    }

    return new Proxy(selector, {get: createGetTrap(customMethods)});
  };

  return createSelector;
};
