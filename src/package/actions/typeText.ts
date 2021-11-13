import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

type Options = Parameters<typeof testController.typeText>[2];

/**
 * Types the specified text into an input element.
 */
export const typeText = async (
  selector: Selector,
  text: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  await log(`Type "${text}" into an input element`, {locator, options}, 'internalAction');

  await testController.typeText(selector as Inner.Selector, text, options);

  await waitForInterfaceStabilization();
};
