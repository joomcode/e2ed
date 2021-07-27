import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.typeText>[2];

/**
 * Types the specified text into an input element.
 */
export const typeText = (selector: Selector, text: string, options?: Options): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log(`Type "${text}" into an input element`, {locator, options});

  return testController.typeText(selector as globalThis.Selector, text, options);
};
