import type {LogEventStatus, LogEventType} from '../constants/internal';

import type {ResponseWithRequest} from './http';

/**
 * Type for `log` function in test context.
 */
export type Log = ((
  this: void,
  message: string,
  payload?: LogPayload,
  logEventType?: LogEventType,
) => void) &
  ((message: string, logEventType: LogEventType) => void);

/**
 * Context of log event.
 */
export type LogContext = Payload;

/**
 * Log parameters for `E2edError` and assert functions.
 */
export type LogParams = Payload & Readonly<{cause?: unknown}>;

/**
 * Payload of log event.
 */
export type LogPayload = Readonly<{
  backendResponses?: readonly Payload[];
  filePath?: unknown;
  logEventStatus?: LogEventStatus;
  successful?: unknown;
}> &
  Payload;

/**
 * Maps responses from the backend to logs during the test.
 * Log the `responseBody` field carefully, as the body of backend response can be very large.
 * If the function returns `undefined`, the response is not logged (skipped).
 */
export type MapBackendResponseToLog = (
  this: void,
  response: ResponseWithRequest,
) => Payload | undefined;

/**
 * Maps log payload to clarify, shorten or skip a log entry.
 * If the mapping returns `skipLog`, the log entry is skipped.
 */
export type MapLogPayload = (
  this: void,
  message: string,
  payload: LogPayload | undefined,
  logEventType?: LogEventType,
) => LogPayload | 'skipLog' | undefined;

/**
 * Maps log payload for logging step in HTML report to clarify, shorten or skip a report step.
 * If the mapping returns `skipLog`, the step is skipped.
 */
export type MapLogPayloadInReport = (
  this: void,
  message: string,
  payload: LogPayload | undefined,
  logEventType: LogEventType,
) => LogPayload | 'skipLog' | undefined;

/**
 * Object with some payload.
 */
export type Payload = Readonly<Record<string, unknown>>;
