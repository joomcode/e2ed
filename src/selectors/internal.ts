import {createSelectors} from './createSelectors';

export const {htmlElementSelector} = createSelectors({
  getTestAttributeName: (property) => (property === 'id' ? 'data-testid' : `data-test-${property}`),
});
