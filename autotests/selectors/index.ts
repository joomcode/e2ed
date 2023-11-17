import {createSelectors} from 'e2ed/selectors';

export {inputSelector} from './inputSelector';

export const {createSelector, createSelectorByCss, locatorIdSelector, htmlElementSelector} =
  createSelectors({
    getTestAttrName: (property) => (property === 'id' ? 'data-testid' : `data-test-${property}`),
  });
