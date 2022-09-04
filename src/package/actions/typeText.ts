import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.typeText>[2];

/**
 * Types the specified text into an input element.
 */
export const typeText = async (
  selector: Selector,
  text: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log(
    `Type "${text}" into an input element`,
    {locator, options},
    LogEventType.InternalAction,
  );

  await testController.typeText(selector as TestCafeSelector, text, options);

  await waitForInterfaceStabilization();
};
