import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1] & WithStabilizationInterval;

/**
 * Double-clicks an element.
 */
export const doubleClick = async (
  selector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);
  const withLocator = locator ? ` with locator ${locator}` : '';

  log(
    `Double-click an element${withLocator}`,
    {...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.doubleClick(selector as TestCafeSelector, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
