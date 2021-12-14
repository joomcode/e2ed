import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

type Options = Parameters<typeof testController.hover>[1];

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log(
    'Hover the mouse pointer over an element',
    {locator, options},
    LogEventType.InternalAction,
  );

  await testController.hover(selector as Inner.Selector, options);

  await waitForInterfaceStabilization();
};
