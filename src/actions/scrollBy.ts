import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Inner} from 'testcafe-without-typecheck';

import type {Selector} from '../types/internal';

type ScrollBy = ((x: number, y: number) => Promise<void>) &
  ((selector: Selector, x: number, y: number, options?: Inner.OffsetOptions) => Promise<void>);

/**
 * Scrolls the document (or element) by the given offset.
 */
// @ts-expect-error: e2ed Selector type is incompatible with TS Selector
export const scrollBy: ScrollBy = (...args) => {
  const description = getDescriptionFromSelector(args[0] as Selector);
  const printedArgs = [...args];

  if (typeof args[0] === 'object') {
    printedArgs.shift();
  }

  log(
    'Scroll the document (or element) by the given offset',
    {args: printedArgs, description},
    LogEventType.InternalAction,
  );

  return testController.scrollBy(...(args as unknown as [number, number]));
};
