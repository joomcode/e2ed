import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Inner} from 'testcafe-without-typecheck';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.click>[1];

/**
 * Clicks an element.
 */
export const click = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log('Click an element', {locator, options}, LogEventType.InternalAction);

  await testController.click(selector as Inner.Selector, options);

  await waitForInterfaceStabilization();
};
