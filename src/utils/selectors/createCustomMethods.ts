import {getAttributeCssSelector} from './getAttributeCssSelector';
import {getDescriptionFromSelector} from './getDescriptionFromSelector';

import type {AttributesOptions} from '../../createLocator';
import type {Selector, SelectorCustomMethods} from '../../types/internal';

/**
 * Creates custom `e2ed` methods of selector (additional to selector's own methods).
 * @internal
 */
export const createCustomMethods = ({
  parameterAttributePrefix,
  testIdAttribute,
}: AttributesOptions): SelectorCustomMethods => {
  const getParameterAttribute = (parameter: string): string => parameterAttributePrefix + parameter;

  return {
    filterByLocatorParameter(parameter, value) {
      return this.filter(getAttributeCssSelector(getParameterAttribute(parameter), value));
    },
    filterByTestId(testId) {
      return this.filter(getAttributeCssSelector(testIdAttribute, testId));
    },

    findByLocatorParameter(parameter, value) {
      return this.find(getAttributeCssSelector(getParameterAttribute(parameter), value));
    },
    findByTestId(testId) {
      return this.find(getAttributeCssSelector(testIdAttribute, testId));
    },

    getDescription(): string | undefined {
      return getDescriptionFromSelector(this as unknown as Selector);
    },
    getLocatorParameter(parameter) {
      return this.getAttribute(getParameterAttribute(parameter));
    },
    getTestId() {
      return this.getAttribute(testIdAttribute);
    },

    hasLocatorParameter(parameter) {
      return this.hasAttribute(getParameterAttribute(parameter));
    },
    hasTestId() {
      return this.hasAttribute(testIdAttribute);
    },
  };
};
