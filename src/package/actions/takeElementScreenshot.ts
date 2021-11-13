import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

type Options = Parameters<typeof testController.takeElementScreenshot>[2];

/**
 * Takes a screenshot of the specified element.
 */
export const takeElementScreenshot = async (
  selector: Selector,
  path?: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);
  const pathMessage = path === undefined ? '' : ` to path "${path}"`;

  await log(`Take a screenshot of the element${pathMessage}`, {locator, options}, 'internalAction');

  return testController.takeElementScreenshot(selector as Inner.Selector, path, options);
};
