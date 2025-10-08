import {LogEventType} from '../../../constants/internal';

import type {LogEvent, LogEventWithChildren} from '../../../types/internal';

/**
 * Group log events to log events with children (for groupping of `TestRun` steps).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const groupLogEvents = (logEvents: readonly LogEvent[]): readonly LogEventWithChildren[] => {
  const topLevelTypes: readonly LogEventType[] = [
    LogEventType.Action,
    LogEventType.Assert,
    LogEventType.Entity,
    LogEventType.InternalAction,
    LogEventType.InternalAssert,
  ];

  const result: LogEventWithChildren[] = [];

  for (const logEvent of logEvents) {
    const last = result.at(-1);
    const newEvent: LogEventWithChildren = {children: [], ...logEvent};

    if (topLevelTypes.includes(logEvent.type)) {
      if (last && !topLevelTypes.includes(last.type)) {
        const firstTopLevel: LogEventWithChildren = {
          children: [...result],
          message: 'Initialization',
          payload: undefined,
          time: last.time,
          type: LogEventType.InternalCore,
        };

        result.length = 0;

        result.push(firstTopLevel);
      }

      result.push(newEvent);
    } else if (last && topLevelTypes.includes(last.type)) {
      (last.children as LogEventWithChildren[]).push(newEvent);
    } else {
      result.push(newEvent);
    }
  }

  return result;
};
