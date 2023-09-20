import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.rightClick>[1];

/**
 * Double-clicks an element.
 */
export const rightClick = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);
  const withLocator = locator ? ` with locator ${locator}` : '';

  log(`Right-click an element${withLocator}`, {options}, LogEventType.InternalAction);

  await testController.rightClick(selector as TestCafeSelector, options);

  await waitForInterfaceStabilization();
};
