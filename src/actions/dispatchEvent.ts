import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Selector, WithStabilizationInterval} from '../types/internal';

type Options = Record<string, unknown> & WithStabilizationInterval;

/**
 * Dispatches an event over a specified DOM element.
 */
export const dispatchEvent = (
  selector: Selector,
  eventName: string,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  log(
    'Dispatches an event over a specified element',
    {...options, selector, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
