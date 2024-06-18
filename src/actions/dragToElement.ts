import {LogEventType} from '../constants/internal';
import {log} from '../utils/log';
import {getDescriptionFromSelector} from '../utils/selectors';

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
  const description = getDescriptionFromSelector(selector);
  const destinationDescription = getDescriptionFromSelector(destinationSelector);

  log(
    'Drag an element onto another one',
    {description, destinationDescription, ...options, stabilizationInterval},
    LogEventType.InternalAction,
  );

  // TODO
  return Promise.resolve();
};
