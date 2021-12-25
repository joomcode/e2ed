import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

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
    selector as Inner.Selector,
    destinationSelector as Inner.Selector,
    options,
  );

  await waitForInterfaceStabilization();
};
