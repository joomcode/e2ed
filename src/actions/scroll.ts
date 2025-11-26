/* eslint-disable no-param-reassign */

import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {Selector} from '../utils/selectors';

type Scroll = ((posX: number, posY: number) => Promise<void>) &
  ((position: ScrollPosition) => Promise<void>) &
  ((selector: Selector, scrollLeft: number, scrollTop: number) => Promise<void>) &
  ((selector: Selector, position: ScrollPosition) => Promise<void>);

type ScrollPosition =
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'topLeft'
  | 'topRight';

/**
 * Scrolls the document (or element) to the specified absolute position.
 */
export const scroll = ((...args) => {
  const printedArgs = [...args] as (number | string)[];

  if (args[0] instanceof Selector) {
    printedArgs.shift();
  }

  const selector =
    args[0] instanceof Selector
      ? args[0]
      : Selector.create({
          cssString: 'html',
          parameterAttributePrefix: 'data-test-',
          testIdAttribute: 'data-testid',
          testIdSeparator: '-',
        });

  log(
    'Scroll the document (or element) to the specified position',
    {args: printedArgs, selector},
    LogEventType.InternalAction,
  );

  return selector.getPlaywrightLocator().evaluate((el, clientArgs) => {
    const centerX = Math.floor(el.scrollWidth / 2 - el.clientWidth / 2);
    const centerY = Math.floor(el.scrollHeight / 2 - el.clientHeight / 2);

    const positions: Record<ScrollPosition, readonly [number, number]> = {
      bottom: [centerX, el.scrollHeight],
      bottomLeft: [0, el.scrollHeight],
      bottomRight: [el.scrollWidth, el.scrollHeight],
      center: [centerX, centerY],
      left: [0, centerY],
      right: [el.scrollWidth, centerY],
      top: [centerX, 0],
      topLeft: [0, 0],
      topRight: [el.scrollWidth, 0],
    };

    const position = positions[clientArgs[0] as ScrollPosition];

    const [x, y] = position ?? clientArgs;

    el.scrollLeft = x;
    el.scrollTop = y;
  }, printedArgs);
}) as Scroll;
