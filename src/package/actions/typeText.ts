import {t as testController} from 'testcafe';

import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.typeText>[2];

/**
 * Types the specified text into an input element.
 */
export const typeText = (
  selector: Selector,
  text: string,
  options?: Options,
): TestControllerPromise => {
  log(`Type "${text}" into an input element`, {options});

  return testController.typeText(selector as globalThis.Selector, text, options);
};
