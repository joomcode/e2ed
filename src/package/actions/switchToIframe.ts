import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = async (iframeSelector: Selector): Promise<void> => {
  const locator = getLocatorFromSelector(iframeSelector);

  log('Switch browsing context to the specified iframe', {locator}, LogEventType.InternalAction);

  await testController.switchToIframe(iframeSelector as TestCafeSelector);

  await waitForInterfaceStabilization();
};
