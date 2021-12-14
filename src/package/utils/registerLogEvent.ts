import {RUNS_HASH} from '../constants/internal';

import {assertValueIsDefined} from './asserts';

import type {LogEvent, RunId} from '../types/internal';

/**
 * Register log event (for report).
 * @internal
 */
export const registerLogEvent = async (runId: RunId, logEvent: LogEvent): Promise<number> => {
  const runTestEvent = RUNS_HASH[runId];

  assertValueIsDefined(runTestEvent);

  const numberInRun = runTestEvent.logEvents.length;

  (runTestEvent.logEvents as LogEvent[])[numberInRun] = logEvent;

  return Promise.resolve(numberInRun);
};
