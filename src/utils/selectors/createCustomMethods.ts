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
  const locatorIdAttributeName = getLocatorAttributeName('id');

  /* eslint-disable sort-keys */
  return {
    filterByLocatorId(locatorId) {
      return this.filter(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    findByLocatorId(locatorId) {
      return this.find(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    parentByLocatorId(locatorId) {
      return this.parent(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    childByLocatorId(locatorId) {
      return this.child(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    siblingByLocatorId(locatorId) {
      return this.sibling(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    nextSiblingByLocatorId(locatorId) {
      return this.nextSibling(`[${locatorIdAttributeName}="${locatorId}"]`);
    },
    prevSiblingByLocatorId(locatorId) {
      return this.prevSibling(`[${locatorIdAttributeName}="${locatorId}"]`);
    },

    filterByLocatorParameter(parameter, value) {
      return this.filter(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    findByLocatorParameter(parameter, value) {
      return this.find(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    parentByLocatorParameter(parameter, value) {
      return this.parent(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    childByLocatorParameter(parameter, value) {
      return this.child(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    siblingByLocatorParameter(parameter, value) {
      return this.sibling(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    nextSiblingByLocatorParameter(parameter, value) {
      return this.nextSibling(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },
    prevSiblingByLocatorParameter(parameter, value) {
      return this.prevSibling(`[${getLocatorAttributeName(parameter)}="${value}"]`);
    },

    getLocatorId() {
      return this.getAttribute(locatorIdAttributeName);
    },
    hasLocatorId() {
      return this.hasAttribute(locatorIdAttributeName);
    },
    getLocatorParameter(parameter) {
      return this.getAttribute(getLocatorAttributeName(parameter));
    },
    hasLocatorParameter(parameter) {
      return this.hasAttribute(getLocatorAttributeName(parameter));
    },

    getDescription(): string | undefined {
      return getDescriptionFromSelector(this as unknown as Selector);
    },
  };
  /* eslint-enable sort-keys */
};
