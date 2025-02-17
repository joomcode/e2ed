import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Selector, WithStabilizationInterval} from '../types/internal';

type Options = WithStabilizationInterval;

/**
 * Drags an element by an offset.
 */
export const drag = (
  selector: Selector,
  dragOffsetX: number,
  dragOffsetY: number,
  {stabilizationInterval, ...options}: Options = {},
  // eslint-disable-next-line @typescript-eslint/max-params
): Promise<void> => {
  log(
    'Drag an element by an offset',
    {dragOffsetX, dragOffsetY, ...options, selector, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
