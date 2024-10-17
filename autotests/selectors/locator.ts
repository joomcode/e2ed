import {attributesOptions} from 'autotests/constants';
import {createTestUtils} from 'e2ed/createLocator';

import {createSelector} from './createSelector';

import type {LocatorFunction} from 'create-locator';
import type {Selector} from 'e2ed/types';

/**
 * Test utils, that produce `Selector`, CSS selector string and `testId` string.
 */
const utils = createTestUtils({
  attributesOptions,
  createLocatorByCssSelector: (selector) =>
    createSelector(selector.replace('data-test-runhash', 'data-runhash')),
  supportWildcardsInCssSelectors: true,
});

/**
 * Locator, that produce `Selector`.
 */
export const locator: LocatorFunction<Selector> = utils.locator;

/**
 * Locator, that produce CSS selector string.
 */
export const cssSelector: LocatorFunction<string> = utils.selector;

/**
 * Locator, that produce `testId` string.
 */
export const testId: LocatorFunction<string> = utils.testId;
