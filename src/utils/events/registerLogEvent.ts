import {getTestRunEvent} from './getTestRunEvent';

import type {LogEvent, RunId} from '../../types/internal';

type LogEventWithNullablePayload = Omit<LogEvent, 'payload'> &
  Readonly<{payload: LogEvent['payload'] | null}>;

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = (runId: RunId, logEvent: LogEventWithNullablePayload): void => {
  const runTestEvent = getTestRunEvent(runId);

  if (logEvent.payload !== null) {
    (runTestEvent.logEvents as LogEvent[]).push(logEvent as LogEvent);
  }

  runTestEvent.onlog();
};
