import {getTestRunEvent} from './getTestRunEvent';

import type {LogEvent, RunId} from '../../types/internal';

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = (runId: RunId, logEvent: LogEvent): void => {
  const runTestEvent = getTestRunEvent(runId);

  (runTestEvent.logEvents as LogEvent[]).push(logEvent);

  runTestEvent.onlog();
};
