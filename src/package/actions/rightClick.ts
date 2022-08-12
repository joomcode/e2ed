import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.rightClick>[1];

/**
 * Double-clicks an element.
 */
export const rightClick = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log('Right-click an element', {locator, options}, LogEventType.InternalAction);

  await testController.rightClick(selector as TestCafeSelector, options);

  await waitForInterfaceStabilization();
};
