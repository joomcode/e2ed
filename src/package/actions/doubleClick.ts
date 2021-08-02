import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1];

/**
 * Double-clicks an element.
 */
export const doubleClick = (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Double-click an element', {locator, options});

  return testController
    .doubleClick(selector as globalThis.Selector, options)
    .then(() => waitForInterfaceStabilization());
};
