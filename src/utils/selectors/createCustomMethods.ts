import {getDescriptionFromSelector} from './getDescriptionFromSelector';

import type {
  GetLocatorAttributeNameFn,
  Selector,
  SelectorCustomMethods,
} from '../../types/internal';

/**
 * Creates custom `e2ed` methods of selector (additional to selector's own methods from TestCafe).
 * @internal
 */
export const createCustomMethods = (
  getLocatorAttributeName: GetLocatorAttributeNameFn,
): SelectorCustomMethods => {
  const getName: GetLocatorAttributeNameFn = (parameter) =>
    getLocatorAttributeName(parameter).toLowerCase();

  const locatorIdAttributeName = getName('id');

  return {
    /* eslint-disable sort-keys */

    filterByLocatorId(locatorId) {
      return this.filter(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    findByLocatorId(locatorId) {
      return this.find(`[${locatorIdAttributeName}="${locatorId}"]`);
    },

    filterByLocatorParameter(parameter, value) {
      return this.filter(`[${getName(parameter)}="${value}"]`);
    },
    findByLocatorParameter(parameter, value) {
      return this.find(`[${getName(parameter)}="${value}"]`);
    },

    getLocatorId() {
      return this.getAttribute(locatorIdAttributeName);
    },
    hasLocatorId() {
      return this.hasAttribute(locatorIdAttributeName);
    },
    getLocatorParameter(parameter) {
      return this.getAttribute(getName(parameter));
    },
    hasLocatorParameter(parameter) {
      return this.hasAttribute(getName(parameter));
    },

    getDescription(): string | undefined {
      return getDescriptionFromSelector(this as unknown as Selector);
    },

    /* eslint-enable sort-keys */
  };
};
