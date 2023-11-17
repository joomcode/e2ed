import {createSelectors} from './createSelectors';

export const {htmlElementSelector} = createSelectors({
  getTestAttrName: (property) => (property === 'id' ? 'data-testid' : `data-test-${property}`),
});
