import {t as testController} from 'testcafe';

import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.rightClick>[1];

/**
 * Double-click an element.
 */
export const rightClick = (selector: Selector, options?: Options): TestControllerPromise => {
  log('Right-click an element', {options});

  return testController.rightClick(selector as globalThis.Selector, options);
};
