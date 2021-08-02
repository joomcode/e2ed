import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.hover>[1];

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = async (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Hover the mouse pointer over an element', {locator, options});

  await testController.hover(selector as globalThis.Selector, options);

  await waitForInterfaceStabilization();
};
