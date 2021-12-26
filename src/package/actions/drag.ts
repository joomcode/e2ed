import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/getLocatorFromSelector';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitForInterfaceStabilization';

import type {Inner} from 'testcafe-without-typecheck';

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

  await log(
    'Drag an element by an offset',
    {dragOffsetX, dragOffsetY, locator, options},
    LogEventType.InternalAction,
  );

  await testController.drag(selector as Inner.Selector, dragOffsetX, dragOffsetY, options);

  await waitForInterfaceStabilization();
};
