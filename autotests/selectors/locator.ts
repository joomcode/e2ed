import {attributesOptions} from 'autotests/constants';
import {createTestUtils} from 'e2ed/createLocator';

import {createSelectorByCss} from './selectorFunctions';

/**
 * Test utils, that produce `Selector`.
 */
export const {chain, locator} = createTestUtils({
  attributesOptions,
  createLocatorByCssSelector: (cssSelector) =>
    createSelectorByCss(cssSelector.replace('data-test-runhash', 'data-runhash')),
  supportWildcardsInCssSelectors: true,
});
