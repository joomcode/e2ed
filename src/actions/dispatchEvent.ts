import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Record<string, unknown> & WithStabilizationInterval;

/**
 * Dispatches an event over a specified DOM element.
 */
export const dispatchEvent = async (
  selector: Selector,
  eventName: string,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    'Dispatches an event over a specified element',
    {description, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.dispatchEvent(selector as unknown as TestCafeSelector, eventName, options);

  await waitForInterfaceStabilization(stabilizationInterval);
};
