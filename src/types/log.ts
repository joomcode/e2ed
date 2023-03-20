import type {LogEventStatus, LogEventType} from '../constants/internal';

/**
 * Payload of log event.
 */
export type LogPayload = Readonly<Record<string, unknown> & {logEventStatus?: LogEventStatus}>;

/**
 * Log parameters for E2Ederror and assert functions.
 */
export type LogParams = Readonly<Record<string, unknown> & {cause?: unknown}>;

/**
 * Context of log event.
 */
export type LogContext = Readonly<Record<string, unknown>>;

/**
 * Type for log function in test context.
 */
export type Log = ((message: string, payload?: LogPayload, logEventType?: LogEventType) => void) &
  ((message: string, logEventType: LogEventType) => void);

/**
 * Maps log payload to clarify, shorten or skip a log entry.
 * If the mapping returns `null`, the log entry is skipped.
 */
export type MapLogPayload = (
  message: string,
  payload: LogPayload | undefined,
  logEventType?: LogEventType,
) => LogPayload | null | undefined;

/**
 * Maps log payload for logging step in HTML report to clarify, shorten or skip a report step.
 * If the mapping returns `null`, the step is skipped.
 */
export type MapLogPayloadInReport = (
  message: string,
  payload: LogPayload | undefined,
  logEventType: LogEventType,
) => LogPayload | null | undefined;
