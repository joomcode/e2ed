import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Record<string, unknown>;

/**
 * Dispatches an event over a specified DOM element.
 */
export const dispatchEvent = async (
  selector: Selector,
  eventName: string,
  options?: Options,
): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);

  log(
    'Dispatches an event over a specified element',
    {locator, options},
    LogEventType.InternalAction,
  );

  await testController.dispatchEvent(selector as TestCafeSelector, eventName, options);

  await waitForInterfaceStabilization();
};
