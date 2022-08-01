import {getTestRunEvent} from './getTestRunEvent';

import type {LogEvent, RunId} from '../../types/internal';

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = (runId: RunId, logEvent: LogEvent): Promise<number> => {
  const runTestEvent = getTestRunEvent(runId);

  const numberInRun = runTestEvent.logEvents.length;

  (runTestEvent.logEvents as LogEvent[])[numberInRun] = logEvent;

  return Promise.resolve(numberInRun);
};
