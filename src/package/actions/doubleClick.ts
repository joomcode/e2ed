import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1];

/**
 * Double-clicks an element.
 */
export const doubleClick = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Double-click an element', {locator, options});

  await testController.doubleClick(selector, options);

  await waitForInterfaceStabilization();
};
