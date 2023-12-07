import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  const description = getDescriptionFromSelector(selector);

  log(
    `Type "${text}" into an input element`,
    {description, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.typeText(selector as unknown as TestCafeSelector, text, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
