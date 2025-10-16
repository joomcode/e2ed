import {LogEventStatus, LogEventType} from '../../../constants/internal';

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

  const isTopLevelEvent = (logEvent: LogEvent): boolean =>
    topLevelTypes.includes(logEvent.type) ||
    logEvent.payload?.logEventStatus === LogEventStatus.Failed;

  const result: LogEventWithChildren[] = [];

  for (const logEvent of logEvents) {
    const last = result.at(-1);
    const newEvent: LogEventWithChildren = {children: [], ...logEvent};

    if (isTopLevelEvent(logEvent)) {
      if (last && !isTopLevelEvent(last)) {
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
    } else if (last && isTopLevelEvent(last)) {
      (last.children as LogEventWithChildren[]).push(newEvent);
    } else {
      result.push(newEvent);
    }
  }

  return result;
};
