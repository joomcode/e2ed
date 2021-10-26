import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

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

  log('Click an element', {locator, options});

  await testController.dispatchEvent(selector, eventName, options);

  await waitForInterfaceStabilization();
};
