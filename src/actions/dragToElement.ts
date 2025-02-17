import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';

import type {Selector, WithStabilizationInterval} from '../types/internal';

type Options = WithStabilizationInterval;

/**
 * Drags an element onto another one.
 */
export const dragToElement = (
  selector: Selector,
  destinationSelector: Selector,
  {stabilizationInterval, ...options}: Options = {},
): Promise<void> => {
  log(
    'Drag an element onto another one',
    {destinationSelector, ...options, selector, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
