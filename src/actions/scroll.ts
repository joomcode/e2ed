import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Inner} from 'testcafe-without-typecheck';

import type {Selector} from '../types/internal';

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
export const scroll: Scroll = (...args) => {
  const description = getDescriptionFromSelector(args[0] as Selector);
  const printedArgs = [...args];

  if (typeof args[0] === 'object') {
    printedArgs.shift();
  }

  log(
    'Scroll the document (or element) to the specified position',
    {args: printedArgs, description},
    LogEventType.InternalAction,
  );

  return testController.scroll(...(args as unknown as [number, number]));
};
