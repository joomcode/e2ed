import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.click>[1];

/**
 * Clicks an element.
 */
export const click = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);
  const withLocator = locator ? ` with locator ${locator}` : '';

  log(`Click an element${withLocator}`, {options}, LogEventType.InternalAction);

  await testController.click(selector as TestCafeSelector, options);

  await waitForInterfaceStabilization();
};
