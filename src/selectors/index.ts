import {createSelectors} from './createSelectors';

export const {createSelector, createSelectorByCss, htmlElementSelector, locatorIdSelector} =
  createSelectors({
    getTestAttrName: (property) => (property === 'id' ? 'data-testid' : `data-test-${property}`),
  });

export {createSelectors};
