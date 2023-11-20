import {DESCRIPTION_KEY} from '../constants/internal';

import type {GetTestAttributeNameFn, SelectorDefaultCustomMethods} from '../types/internal';

export const createDefaultCustomMethods = (
  getTestAttributeName: GetTestAttributeNameFn,
): SelectorDefaultCustomMethods => {
  const testIdAttrName = getTestAttributeName('id');

  /* eslint-disable sort-keys */
  return {
    filterByTestId(testId) {
      return this.filter(`[${testIdAttrName}="${testId}"]`);
    },
    findByTestId(testId) {
      return this.find(`[${testIdAttrName}="${testId}"]`);
    },
    parentByTestId(testId) {
      return this.parent(`[${testIdAttrName}="${testId}"]`);
    },
    childByTestId(testId) {
      return this.child(`[${testIdAttrName}="${testId}"]`);
    },
    siblingByTestId(testId) {
      return this.sibling(`[${testIdAttrName}="${testId}"]`);
    },
    nextSiblingByTestId(testId) {
      return this.nextSibling(`[${testIdAttrName}="${testId}"]`);
    },
    prevSiblingByTestId(testId) {
      return this.prevSibling(`[${testIdAttrName}="${testId}"]`);
    },

    filterByTestProp(property, value) {
      return this.filter(`[${getTestAttributeName(property)}="${value}"]`);
    },
    findByTestProp(property, value) {
      return this.find(`[${getTestAttributeName(property)}="${value}"]`);
    },
    parentByTestProp(property, value) {
      return this.parent(`[${getTestAttributeName(property)}="${value}"]`);
    },
    childByTestProp(property, value) {
      return this.child(`[${getTestAttributeName(property)}="${value}"]`);
    },
    siblingByTestProp(property, value) {
      return this.sibling(`[${getTestAttributeName(property)}="${value}"]`);
    },
    nextSiblingByTestProp(property, value) {
      return this.nextSibling(`[${getTestAttributeName(property)}="${value}"]`);
    },
    prevSiblingByTestProp(property, value) {
      return this.prevSibling(`[${getTestAttributeName(property)}="${value}"]`);
    },

    getTestProp(property) {
      return this.getAttribute(getTestAttributeName(property));
    },
    hasTestProp(property) {
      return this.hasAttribute(getTestAttributeName(property));
    },

    getDescription(): string | undefined {
      return this[DESCRIPTION_KEY] as string | undefined;
    },
  };
  /* eslint-enable sort-keys */
};
