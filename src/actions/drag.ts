import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getDescriptionFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import {waitForInterfaceStabilization} from './waitFor';

import type {Selector, TestCafeSelector, WithStabilizationInterval} from '../types/internal';

type Options = Parameters<typeof testController.drag>[3] & WithStabilizationInterval;

/**
 * Drags an element by an offset.
 */
export const drag = async (
  selector: Selector,
  dragOffsetX: number,
  dragOffsetY: number,
  {stabilizationInterval, ...options}: Options = {},
  // eslint-disable-next-line max-params
): Promise<void> => {
  const locator = getDescriptionFromSelector(selector);

  log(
    'Drag an element by an offset',
    {dragOffsetX, dragOffsetY, locator, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  await testController.drag(
    selector as unknown as TestCafeSelector,
    dragOffsetX,
    dragOffsetY,
    options,
  );

  await waitForInterfaceStabilization(stabilizationInterval);
};
