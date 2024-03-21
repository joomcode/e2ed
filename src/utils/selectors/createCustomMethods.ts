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
      return this.filter(`[${getName(parameter)}="${value}"]`);
    },
    findByLocatorParameter(parameter, value) {
      return this.find(`[${getName(parameter)}="${value}"]`);
    },
    parentByLocatorParameter(parameter, value) {
      return this.parent(`[${getName(parameter)}="${value}"]`);
    },
    childByLocatorParameter(parameter, value) {
      return this.child(`[${getName(parameter)}="${value}"]`);
    },
    siblingByLocatorParameter(parameter, value) {
      return this.sibling(`[${getName(parameter)}="${value}"]`);
    },
    nextSiblingByLocatorParameter(parameter, value) {
      return this.nextSibling(`[${getName(parameter)}="${value}"]`);
    },
    prevSiblingByLocatorParameter(parameter, value) {
      return this.prevSibling(`[${getName(parameter)}="${value}"]`);
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
