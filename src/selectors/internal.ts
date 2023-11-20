import {createSelectors} from './createSelectors';

export const {htmlElementSelector} = createSelectors({
  getLocatorAttributeName: (property) =>
    property === 'id' ? 'data-testid' : `data-test-${property}`,
});
