import {getTestRunEvent} from './getTestRunEvent';

import type {LogEvent, RunId} from '../../types/internal';

type LogEventWithMaybeSkippedPayload = Omit<LogEvent, 'payload'> &
  Readonly<{payload: LogEvent['payload'] | 'skipLog'}>;

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = (runId: RunId, logEvent: LogEventWithMaybeSkippedPayload): void => {
  const runTestEvent = getTestRunEvent(runId);

  if (logEvent.payload !== 'skipLog') {
    (runTestEvent.logEvents as LogEvent[]).push(logEvent as LogEvent);
  }

  runTestEvent.onlog();
};
