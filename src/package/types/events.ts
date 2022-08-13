import type {LogEventType, TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {LogPayload} from './log';
import type {RunLabel} from './runLabel';
import type {FullStartInfo} from './startInfo';
import type {FullTestRun, RejectTestRun, RunId, TestFn, TestStaticOptions} from './testRun';

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
  hasRunError: boolean;
  runId: RunId;
  unknownRunError: unknown;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Object with full events data (for report).
 * @internal
 */
export type FullEventsData = Readonly<{
  endE2edRunEvent: EndE2edRunEvent;
  fullStartInfo: FullStartInfo;
  fullTestRuns: readonly FullTestRun[];
}>;

/**
 * E2edRun event (once event on starting e2ed).
 * @internal
 */
export type E2edRunEvent = Readonly<{
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Onlog test run callback.
 */
export type Onlog = () => void;

/**
 * TestRun event (on starting one test).
 */
export type TestRunEvent = Readonly<{
  logEvents: readonly LogEvent[];
  onlog: Onlog;
  previousRunId: RunId | undefined;
  reject: RejectTestRun;
  runId: RunId;
  runLabel: RunLabel;
  status: TestRunStatus;
  testFnWithReject: TestFn;
  utcTimeInMs: UtcTimeInMs;
}> &
  TestStaticOptions;
