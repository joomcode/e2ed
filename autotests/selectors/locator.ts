import {attributesOptions} from 'autotests/constants';
import {createTestUtils} from 'e2ed/createLocator';

import {createSelectorByCss} from './selectorFunctions';

/**
 * Test utils, that produce `Selector`.
 */
export const {
  locator,
  selector: cssSelector,
  testId,
} = createTestUtils({
  attributesOptions,
  createLocatorByCssSelector: (selector) =>
    createSelectorByCss(selector.replace('data-test-runhash', 'data-runhash')),
  supportWildcardsInCssSelectors: true,
});
