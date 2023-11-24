import {createSelectorFunctions} from './createSelectorFunctions';

/**
 * Internal implementation of `htmlElementSelector` selector.
 * @internal
 */
export const {htmlElementSelector} = createSelectorFunctions({
  getLocatorAttributeName: (parameter) =>
    parameter === 'id' ? 'data-testid' : `data-test-${parameter}`,
});
