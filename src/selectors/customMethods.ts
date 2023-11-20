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
    getLocatorParameter(parameter) {
      return this.getAttribute(getLocatorAttributeName(parameter));
    },
    hasLocatorParameter(parameter) {
      return this.hasAttribute(getLocatorAttributeName(parameter));
    },

    getDescription(): string | undefined {
      return (this as {[DESCRIPTION_KEY]?: string})[DESCRIPTION_KEY];
    },
  };
  /* eslint-enable sort-keys */
};
