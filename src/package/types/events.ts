import type {LogEventType} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {LogPayload} from './log';
import type {RunLabel} from './runLabel';
import type {FullStartInfo} from './startInfo';
import type {RejectTestRun, RunId, TestRunWithHooks, TestStaticOptions} from './testRun';

/**
 * Log event (on log call).
 */
export type LogEvent = Readonly<{
  message: string;
  payload: LogPayload | undefined;
  type: LogEventType;
  time: UtcTimeInMs;
}>;

/**
 * EndE2edRun event (once event after all retries of all tests).
 * @internal
 */
export type EndE2edRunEvent = Readonly<{
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * EndTestRun event (on closing test).
 * @internal
 */
export type EndTestRunEvent = Readonly<{
  error: string | undefined;
  runId: RunId;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Object with full events data (for report).
 * @internal
 */
export type FullEventsData = Readonly<{
  endE2edRunEvent: EndE2edRunEvent;
  fullStartInfo: FullStartInfo;
  testRunsWithHooks: readonly TestRunWithHooks[];
}>;

/**
 * E2edRun event (once event on starting e2ed).
 * @internal
 */
export type E2edRunEvent = Readonly<{
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * TestRun event (on starting one test).
 */
export type TestRunEvent = Readonly<{
  ended: boolean;
  isSkipped: boolean;
  logEvents: readonly LogEvent[];
  previousRunId: RunId | undefined;
  reject: RejectTestRun;
  runId: RunId;
  runLabel: RunLabel;
  utcTimeInMs: UtcTimeInMs;
}> &
  TestStaticOptions;
