import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type ScrollBy = ((x: number, y: number) => Promise<void>) &
  ((selector: Selector, x: number, y: number, options?: OffsetOptions) => Promise<void>);

/**
 * Scrolls the document (or element) by the given offset.
 */
// @ts-expect-error: e2ed Selector type is incompatible with TS Selector
export const scrollBy: ScrollBy = (...args) => {
  const locator = getLocatorFromSelector(args[0] as Selector);
  const printedArgs = [...args];

  if (typeof args[0] === 'object') {
    printedArgs.shift();
  }

  log('Scroll the document (or element) by the given offset', {locator, args: printedArgs});

  return testController.scrollBy(...(args as unknown as [number, number]));
};
