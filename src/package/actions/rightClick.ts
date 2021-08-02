import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.rightClick>[1];

/**
 * Double-clicks an element.
 */
export const rightClick = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Right-click an element', {locator, options});

  await testController.rightClick(selector as globalThis.Selector, options);

  await waitForInterfaceStabilization();
};
