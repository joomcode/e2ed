import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

type Scroll = ((posX: number, posY: number) => Promise<void>) &
  ((position: Inner.ScrollPosition) => Promise<void>) &
  ((
    selector: Selector,
    scrollLeft: number,
    scrollTop: number,
    options?: Inner.OffsetOptions,
  ) => Promise<void>) &
  ((
    selector: Selector,
    position: Inner.ScrollPosition,
    options?: Inner.OffsetOptions,
  ) => Promise<void>);

/**
 * Scrolls the document (or element) to the specified absolute position.
 */
// @ts-expect-error: e2ed Selector type is incompatible with TS Selector
export const scroll: Scroll = async (...args) => {
  const locator = getLocatorFromSelector(args[0] as Selector);
  const printedArgs = [...args];

  if (typeof args[0] === 'object') {
    printedArgs.shift();
  }

  await log(
    'Scroll the document (or element) to the specified position',
    {locator, args: printedArgs},
    'internalAction',
  );

  return testController.scroll(...(args as unknown as [number, number]));
};
