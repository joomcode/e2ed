import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

/**
 * Switches browsing context to the specified iframe (by iframe selector).
 */
export const switchToIframe = async (
  iframeSelector: Selector,
  {stabilizationInterval}: WithStabilizationInterval = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(iframeSelector);

  log(
    'Switch browsing context to the specified iframe',
    {description, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.switchToIframe(iframeSelector as unknown as TestCafeSelector);

  await waitForInterfaceStabilization(stabilizationInterval);
};
