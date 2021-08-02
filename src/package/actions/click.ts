import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.click>[1];

/**
 * Clicks an element.
 */
export const click = (selector: Selector, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Click an element', {locator, options});

  return testController
    .click(selector as globalThis.Selector, options)
    .then(() => waitForInterfaceStabilization());
};
