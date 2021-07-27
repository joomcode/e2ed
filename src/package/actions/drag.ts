import {t as testController} from 'testcafe';

import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.drag>[3];

/**
 * Drags an element by an offset.
 */
export const drag = (
  selector: Selector,
  dragOffsetX: number,
  dragOffsetY: number,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Drag an element by an offset', {locator, dragOffsetX, dragOffsetY, options});

  return testController.drag(selector as globalThis.Selector, dragOffsetX, dragOffsetY, options);
};
