import type {UtcTimeInMs} from './date';
import type {LogContext, LogEventType, LogPayload} from './log';
import type {TestCafeError} from './run';
import type {RunId, TestOptions} from './test';

/**
 * Logging event (on log call).
 * @internal
 */
export type LogEvent = Readonly<{
  context: LogContext;
  message: string;
  numberInRun: number;
  payload: LogPayload | undefined;
  runId: RunId;
  type: LogEventType;
  utcTimeInMs: UtcTimeInMs;
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
 * @internal
 */
export type RunTestEvent = Readonly<{
  filePath: string;
  name: string;
  options: TestOptions;
  runId: RunId;
  runLabel: string | undefined;
  utcTimeInMs: UtcTimeInMs;
}>;
