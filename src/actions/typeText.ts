import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.typeText>[2] & WithStabilizationInterval;

/**
 * Types the specified text into an input element.
 */
export const typeText = async (
  selector: Selector,
  text: string,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);

  log(
    `Type "${text}" into an input element`,
    {locator, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.typeText(selector as TestCafeSelector, text, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
