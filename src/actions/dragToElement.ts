import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.dragToElement>[2] & WithStabilizationInterval;

/**
 * Drags an element onto another one.
 */
export const dragToElement = async (
  selector: Selector,
  destinationSelector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);
  const destinationLocator = getDescriptionFromSelector(destinationSelector);

  log(
    'Drag an element onto another one',
    {destinationLocator, locator, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.dragToElement(
    selector as unknown as TestCafeSelector,
    destinationSelector as unknown as TestCafeSelector,
    options,
  );

  await waitForInterfaceStabilization(stabilizationInterval);
};
