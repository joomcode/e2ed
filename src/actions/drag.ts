import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  const description = getDescriptionFromSelector(selector);

  log(
    'Drag an element by an offset',
    {description, dragOffsetX, dragOffsetY, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
