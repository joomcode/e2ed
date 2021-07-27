import {Selector} from 'testcafe';

import {LOCATOR_KEY} from './constants/internal';

import type {Selector as SelectorType} from './types/internal';

/**
 * Creates selector by locator and optional parameters.
 */
export const createSelector = (...args: Parameters<typeof Selector>): SelectorType => {
  const locator = args[0];
  const selector = Selector(...args);

  if (typeof locator === 'string') {
    // @ts-expect-error: native Selector type does not have LOCATOR_KEY
    selector[LOCATOR_KEY] = locator;
  }

  return selector;
};
