import type {LogEvent} from '../types/internal';

/**
 * Flats array of log events with children to flat array.
 * @internal
 */
export const flatLogEvents = (logEvents: readonly LogEvent[]): readonly LogEvent[] => {
  const result: LogEvent[] = [];

  for (const logEvent of logEvents) {
    result.push(logEvent);

    if (logEvent.children !== undefined && logEvent.children.length > 0) {
      result.push(...flatLogEvents(logEvent.children));
    }
  }

  return result;
};
