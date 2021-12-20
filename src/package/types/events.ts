import type {LogEventType} from '../constants/internal';
import type {UtcTimeInMs} from './date';
import type {TestFilePath} from './fs';
import type {LogPayload} from './log';
import type {RunId, TestOptions, TestRunWithHooks} from './testRun';

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
  errors: readonly TestCafeError[];
  runId: RunId;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Object with full events data (for report).
 * @internal
 */
export type FullEventsData = Readonly<{
  e2edRunEvent: E2edRunEvent;
  endE2edRunEvent: EndE2edRunEvent;
  testRunsWithHooks: readonly TestRunWithHooks[];
}>;

/**
 * Run environment (run in docker or local run).
 * @internal
 */
export type RunEnvironment = 'docker' | 'local';

/**
 * E2edRun event (once event on starting e2ed).
 * @internal
 */
export type E2edRunEvent = Readonly<{
  concurrency: number;
  runEnvironment: RunEnvironment;
  startMessage: string;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * TestRun event (on starting one test).
 */
export type TestRunEvent = Readonly<{
  ended: boolean;
  filePath: TestFilePath;
  logEvents: readonly LogEvent[];
  name: string;
  options: TestOptions;
  previousRunId: RunId | undefined;
  runId: RunId;
  runLabel: string | undefined;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Internal TestCafe error object (only some fields).
 */
export type TestCafeError = Readonly<{
  message: string;
}>;
