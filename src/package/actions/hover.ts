import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.hover>[1];

/**
 * Hovers the mouse pointer over an element.
 */
export const hover = (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Hover the mouse pointer over an element', {locator, options});

  return testController.hover(selector as globalThis.Selector, options);
};
