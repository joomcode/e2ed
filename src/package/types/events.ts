import type {LogEventType} from '../constants/internal';
import type {UtcTimeInMs} from './date';
import type {LogPayload} from './log';
import type {RunId, TestOptions} from './testRun';

/**
 * Logging event (on log call).
 */
export type LogEvent = Readonly<{
  message: string;
  payload: LogPayload | undefined;
  type: LogEventType;
  time: UtcTimeInMs;
}>;

/**
 * FinishE2ed event (once event after all retries of all tests).
 * @internal
 */
export type FinishE2edEvent = Readonly<{
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * FinishTest event (on closing test).
 * @internal
 */
export type FinishTestEvent = Readonly<{
  errors: readonly TestCafeError[];
  runId: RunId;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Run environment (run in docker or local run).
 * @internal
 */
type RunEnvironment = 'docker' | 'local';

/**
 * RunE2ed event (once event on starting e2ed).
 * @internal
 */
export type RunE2edEvent = Readonly<{
  concurrency: number;
  runEnvironment: RunEnvironment;
  startMessage: string;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * RunTest event (on starting one test).
 */
export type RunTestEvent = Readonly<{
  filePath: string;
  isInternalRetryOf: RunId | undefined;
  logEvents: readonly LogEvent[];
  name: string;
  options: TestOptions;
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
