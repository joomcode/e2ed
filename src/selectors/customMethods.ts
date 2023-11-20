import {DESCRIPTION_KEY} from '../constants/internal';

import type {GetLocatorAttributeNameFn, SelectorCustomMethods} from '../types/internal';

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

    filterByLocatorProperty(property, value) {
      return this.filter(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    findByLocatorProperty(property, value) {
      return this.find(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    parentByLocatorProperty(property, value) {
      return this.parent(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    childByLocatorProperty(property, value) {
      return this.child(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    siblingByLocatorProperty(property, value) {
      return this.sibling(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    nextSiblingByLocatorProperty(property, value) {
      return this.nextSibling(`[${getLocatorAttributeName(property)}="${value}"]`);
    },
    prevSiblingByLocatorProperty(property, value) {
      return this.prevSibling(`[${getLocatorAttributeName(property)}="${value}"]`);
    },

    getLocatorProperty(property) {
      return this.getAttribute(getLocatorAttributeName(property));
    },
    hasLocatorProperty(property) {
      return this.hasAttribute(getLocatorAttributeName(property));
    },

    getDescription(): string | undefined {
      return (this as {[DESCRIPTION_KEY]?: string})[DESCRIPTION_KEY];
    },
  };
  /* eslint-enable sort-keys */
};
