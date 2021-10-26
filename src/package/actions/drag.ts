import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Selector} from '../types/internal';

type Options = Parameters<typeof testController.drag>[3];

/**
 * Drags an element by an offset.
 */
export const drag = async (
  selector: Selector,
  dragOffsetX: number,
  dragOffsetY: number,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log('Drag an element by an offset', {locator, dragOffsetX, dragOffsetY, options});

  await testController.drag(selector, dragOffsetX, dragOffsetY, options);

  await waitForInterfaceStabilization();
};
