import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = async (
  iframeSelector: Selector,
  {stabilizationInterval}: WithStabilizationInterval = {},
): Promise<void> => {
  const locator = getDescriptionFromSelector(iframeSelector);

  log(
    'Switch browsing context to the specified iframe',
    {locator, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.switchToIframe(iframeSelector as unknown as TestCafeSelector);

  await waitForInterfaceStabilization(stabilizationInterval);
};
