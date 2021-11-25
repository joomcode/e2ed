import type {LogContext, LogEventType, LogPayload} from './log';
import type {RunId, TestOptions} from './test';

/**
 * Logging event.
 */
export type LogEvent = Readonly<{
  context: LogContext;
  message: string;
  numberInRun: number;
  payload: LogPayload | undefined;
  runId: RunId;
  time: number;
  type: LogEventType;
}>;

/**
 * RunTest event.
 */
export type RunTestEvent = Readonly<{
  filePath: string;
  name: string;
  options: TestOptions;
  runId: RunId;
  runLabel: string | undefined;
}>;

/**
 * Registred RunTestEvents and LogEvents (for current run).
 */
export type RunEvents = Readonly<{
  logEvents: LogEvent[];
  runTestEvents: RunTestEvent[];
}>;
