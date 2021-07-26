import {t as testController} from 'testcafe';

import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.click>[1];

/**
 * Click an element.
 */
export const click = (selector: Selector, options?: Options): TestControllerPromise => {
  log('Click an element', {options});

  return testController.click(selector as globalThis.Selector, options);
};
