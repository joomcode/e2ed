import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

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

  log('Drag an element onto another one', {locator, destinationLocator, options});

  await testController.dragToElement(selector, destinationSelector, options);

  await waitForInterfaceStabilization();
};
