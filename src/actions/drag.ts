import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  log(
    'Drag an element by an offset',
    {description, dragOffsetX, dragOffsetY, ...options, stabilizationInterval},
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
