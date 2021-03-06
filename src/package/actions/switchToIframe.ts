import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Inner} from 'testcafe-without-typecheck';

import type {Selector} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = async (iframeSelector: Selector): Promise<void> => {
  const locator = getLocatorFromSelector(iframeSelector);

  await log(
    'Switch browsing context to the specified iframe',
    {locator},
    LogEventType.InternalAction,
  );

  await testController.switchToIframe(iframeSelector as Inner.Selector);

  await waitForInterfaceStabilization();
};
