import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  const description = getDescriptionFromSelector(selector);
  const destinationDescription = getDescriptionFromSelector(destinationSelector);

  log(
    'Drag an element onto another one',
    {description, destinationDescription, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.dragToElement(
    selector as unknown as TestCafeSelector,
    destinationSelector as unknown as TestCafeSelector,
    options,
  );

  await waitForInterfaceStabilization(stabilizationInterval);
};
