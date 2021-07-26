import {t as testController} from 'testcafe';

import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.doubleClick>[1];

/**
 * Double-click an element.
 */
export const doubleClick = (selector: Selector, options?: Options): TestControllerPromise => {
  log('Double-click an element', {options});

  return testController.doubleClick(selector as globalThis.Selector, options);
};
