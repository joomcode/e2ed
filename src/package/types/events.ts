import type {UtcTimeInMs} from './date';
import type {LogContext, LogEventType, LogPayload} from './log';
import type {TestCafeError} from './run';
import type {RunId, TestOptions} from './test';

/**
 * Logging event.
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
 * FinishTest event.
 * @internal
 */
export type FinishTestEvent = Readonly<{
  errors: TestCafeError[];
  runId: RunId;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * RunTest event.
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
