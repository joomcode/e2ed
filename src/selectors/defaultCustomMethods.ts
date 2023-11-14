import {DESCRIPTION_KEY} from '../constants/internal';

import type {GetTestAttrNameFn, SelectorDefaultCustomMethods} from '../types/internal';

export const createDefaultCustomMethods = (
  getTestAttrName: GetTestAttrNameFn,
): SelectorDefaultCustomMethods => {
  const testIdAttrName = getTestAttrName('id');

  /* eslint-disable sort-keys */
  return {
    filterByTestId(testId) {
      return this.filter(`[${testIdAttrName}="${testId}"`);
    },
    findByTestId(testId) {
      return this.find(`[${testIdAttrName}="${testId}"`);
    },
    parentByTestId(testId) {
      return this.parent(`[${testIdAttrName}="${testId}"`);
    },
    childByTestId(testId) {
      return this.child(`[${testIdAttrName}="${testId}"`);
    },
    siblingByTestId(testId) {
      return this.sibling(`[${testIdAttrName}="${testId}"`);
    },
    nextSiblingByTestId(testId) {
      return this.nextSibling(`[${testIdAttrName}="${testId}"`);
    },
    prevSiblingByTestId(testId) {
      return this.prevSibling(`[${testIdAttrName}="${testId}"`);
    },

    filterByTestProp(property, value) {
      return this.filter(`[${getTestAttrName(property)}="${value}"`);
    },
    findByTestProp(property, value) {
      return this.find(`[${getTestAttrName(property)}="${value}"`);
    },
    parentByTestProp(property, value) {
      return this.parent(`[${getTestAttrName(property)}="${value}"`);
    },
    childByTestProp(property, value) {
      return this.child(`[${getTestAttrName(property)}="${value}"`);
    },
    siblingByTestProp(property, value) {
      return this.sibling(`[${getTestAttrName(property)}="${value}"`);
    },
    nextSiblingByTestProp(property, value) {
      return this.nextSibling(`[${getTestAttrName(property)}="${value}"`);
    },
    prevSiblingByTestProp(property, value) {
      return this.prevSibling(`[${getTestAttrName(property)}="${value}"`);
    },

    getTestProp(property) {
      return this.getAttribute(getTestAttrName(property));
    },
    hasTestProp(property) {
      return this.hasAttribute(getTestAttrName(property));
    },

    getDescription(): string | undefined {
      return this[DESCRIPTION_KEY] as string | undefined;
    },
  };
  /* eslint-enable sort-keys */
};
