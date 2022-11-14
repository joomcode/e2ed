import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1];

/**
 * Double-clicks an element.
 */
export const doubleClick = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log('Double-click an element', {locator, options}, LogEventType.InternalAction);

  await testController.doubleClick(selector as TestCafeSelector, options);

  await waitForInterfaceStabilization();
};
