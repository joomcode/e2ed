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
