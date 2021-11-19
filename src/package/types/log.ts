import type {Brand} from './utils';

/**
 * Payload of log event.
 */
export type LogPayload = Record<string, unknown>;

/**
 * Type for generallog log.
 */
export type GeneralLog = (message: string, payload?: LogPayload) => void;

/**
 * Context of log event.
 */
export type LogContext = Record<string, unknown>;

/**
 * Type of LogEvent.
 */
export type LogEventType =
  | 'action'
  | 'util'
  | 'internalAction'
  | 'internalAssert'
  | 'internalCore'
  | 'internalUtil'
  | 'unspecified';

/**
 * Unique id of each test run.
 */
export type RunId = Brand<string, 'RunId'>;

/**
 * Logging event.
 */
export type LogEvent = Readonly<{
  context: LogContext;
  message: string;
  numberInRun: number;
  payload: LogPayload | undefined;
  runId: RunId;
  runLabel: string | undefined;
  time: number;
  type: LogEventType;
}>;

/**
 * Type for log function in test context.
 */
export type Log = ((
  message: string,
  payload?: LogPayload,
  logEventType?: LogEventType,
) => Promise<void>) &
  ((message: string, logEventType: LogEventType) => Promise<void>);
