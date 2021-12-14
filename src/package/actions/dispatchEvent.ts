import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

type Options = Record<string, unknown>;

/**
 * Dispatches an event over a specified DOM element.
 */
export const dispatchEvent = async (
  selector: Selector,
  eventName: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log('Click an element', {locator, options}, LogEventType.InternalAction);

  await testController.dispatchEvent(selector as Inner.Selector, eventName, options);

  await waitForInterfaceStabilization();
};
