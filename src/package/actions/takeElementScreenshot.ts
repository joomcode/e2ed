import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.takeElementScreenshot>[2];

/**
 * Takes a screenshot of the specified element.
 */
export const takeElementScreenshot = (
  selector: Selector,
  path?: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);
  const pathMessage = path === undefined ? '' : ` to path "${path}"`;

  log(`Take a screenshot of the element${pathMessage}`, {locator, options});

  return testController.takeElementScreenshot(selector as globalThis.Selector, path, options);
};
