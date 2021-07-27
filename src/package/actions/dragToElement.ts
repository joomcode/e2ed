import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.dragToElement>[2];

/**
 * Drags an element onto another one.
 */
export const dragToElement = (
  selector: Selector,
  destinationSelector: Selector,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);
  const destinationLocator = getLocatorFromSelector(destinationSelector);

  log('Drag an element onto another one', {locator, destinationLocator, options});

  return testController.dragToElement(
    selector as globalThis.Selector,
    destinationSelector as globalThis.Selector,
    options,
  );
};
