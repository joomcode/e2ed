import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.hover>[1] & WithStabilizationInterval;

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = async (
  selector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    'Hover the mouse pointer over an element',
    {description, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.hover(selector as unknown as TestCafeSelector, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
