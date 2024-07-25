import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  const description = getDescriptionFromSelector(selector);

  log(
    'Dispatches an event over a specified element',
    {description, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
