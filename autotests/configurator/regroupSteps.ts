import {LogEventStatus, LogEventType} from 'e2ed/constants';
import {setReadonlyProperty} from 'e2ed/utils';

import type {LogEvent, Mutable} from 'e2ed/types';

/**
 * Regroup log events (for grouping of `TestRun` steps).
 * This base client function should not use scope variables (except other base functions).
 * @internal
 */
export const regroupSteps = (logEvents: readonly LogEvent[]): readonly LogEvent[] => {
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

  const result: LogEvent[] = [];

  for (const logEvent of logEvents) {
    const last = result.at(-1);
    const newEvent: LogEvent = {...logEvent};

    if (isTopLevelEvent(logEvent)) {
      if (last && !isTopLevelEvent(last)) {
        const firstTopLevel: LogEvent = {
          children: [...result],
          endTime: undefined,
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
      if (last.children === undefined) {
        setReadonlyProperty(last, 'children', [newEvent]);
      } else {
        (last.children as Mutable<typeof last.children>).push(newEvent);
      }
    } else {
      result.push(newEvent);
    }
  }

  return result;
};
