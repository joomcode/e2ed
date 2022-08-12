import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.dragToElement>[2];

/**
 * Drags an element onto another one.
 */
export const dragToElement = async (
  selector: Selector,
  destinationSelector: Selector,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);
  const destinationLocator = getLocatorFromSelector(destinationSelector);

  await log(
    'Drag an element onto another one',
    {destinationLocator, locator, options},
    LogEventType.InternalAction,
  );

  await testController.dragToElement(
    selector as TestCafeSelector,
    destinationSelector as TestCafeSelector,
    options,
  );

  await waitForInterfaceStabilization();
};
