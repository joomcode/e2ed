import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.scrollIntoView>[1];

/**
 * Scrolls the specified element into view.
 */
export const scrollIntoView = (selector: Selector, options?: Options): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);

  log('Scroll the specified element into view', {locator, options}, LogEventType.InternalAction);

  return testController.scrollIntoView(selector as TestCafeSelector, options);
};
