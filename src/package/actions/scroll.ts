import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Scroll = ((posX: number, posY: number) => Promise<void>) &
  ((position: ScrollPosition) => Promise<void>) &
  ((
    selector: Selector,
    scrollLeft: number,
    scrollTop: number,
    options?: OffsetOptions,
  ) => Promise<void>) &
  ((selector: Selector, position: ScrollPosition, options?: OffsetOptions) => Promise<void>);

/**
 * Scrolls the document (or element) to the specified absolute position.
 */
// @ts-expect-error: e2ed Selector type is incompatible with TS Selector
export const scroll: Scroll = (...args) => {
  const locator = getLocatorFromSelector(args[0] as Selector);
  const printedArgs = [...args];

  if (typeof args[0] === 'object') {
    printedArgs.shift();
  }

  log('Scroll the document (or element) to the specified position', {locator, args: printedArgs});

  return testController.scroll(...(args as unknown as [number, number]));
};
