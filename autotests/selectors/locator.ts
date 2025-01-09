import {attributesOptions} from 'autotests/constants';
import {createTestLocator} from 'e2ed/createLocator';

import {createSelector} from './createSelector';

import type {LocatorFunction} from 'create-locator';
import type {Selector} from 'e2ed/types';

/**
 * Locator kit with `locator` function, that produce `Selector`,
 * and additional `getSelector` and `getTestId` functions.
 */
const locatorKit = createTestLocator({
  attributesOptions,
  createLocatorByCssSelector: (selector) =>
    createSelector(selector.replace('data-test-runhash', 'data-runhash')),
  supportWildcardsInCssSelectors: true,
});

/**
 * Locator, that produce `Selector`.
 */
export const locator: LocatorFunction<Selector> = locatorKit.locator;

/**
 * Get CSS selector string.
 */
export const getCssSelector: LocatorFunction<string> = locatorKit.getSelector;

/**
 * Get `testId` string.
 */
export const getTestId: LocatorFunction<string> = locatorKit.getTestId;
