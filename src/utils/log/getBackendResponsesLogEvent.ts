import {BACKEND_RESPONSES_LOG_MESSAGE, LogEventType} from '../../constants/internal';

import {setReadonlyProperty} from '../object';

import type {LogEvent, Mutable, UtcTimeInMs} from '../../types/internal';

/**
 * Get log event for backend responses.
 * @internal
 */
export const getBackendResponsesLogEvent = (logEvent: LogEvent): LogEvent => {
  if (logEvent.message === BACKEND_RESPONSES_LOG_MESSAGE) {
    return logEvent;
  }

  if (
    logEvent.children !== undefined &&
    logEvent.children.at(-1)?.message === BACKEND_RESPONSES_LOG_MESSAGE
  ) {
    return logEvent.children.at(-1) as LogEvent;
  }

  const backendResponsesLogEvent: LogEvent = {
    children: undefined,
    endTime: undefined,
    message: BACKEND_RESPONSES_LOG_MESSAGE,
    payload: undefined,
    time: Date.now() as UtcTimeInMs,
    type: LogEventType.InternalUtil,
  };

  if (logEvent.children !== undefined) {
    (logEvent.children as Mutable<typeof logEvent.children>).push(backendResponsesLogEvent);
  } else {
    setReadonlyProperty(logEvent, 'children', [backendResponsesLogEvent]);
  }

  return backendResponsesLogEvent;
};
