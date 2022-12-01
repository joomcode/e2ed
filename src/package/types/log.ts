import type {LogEventStatus, LogEventType} from '../constants/internal';

/**
 * Payload of log event.
 */
export type LogPayload = {
  [x: string]: unknown;
  logEventStatus?: LogEventStatus;
};

/**
 * Log parameters for E2Ederror and assert functions.
 */
export type LogParams = Record<string, unknown> & Readonly<{cause?: unknown}>;

/**
 * Type for generalLog log.
 */
export type GeneralLog = (message: string, payload?: LogPayload) => void;

/**
 * Context of log event.
 */
export type LogContext = Record<string, unknown>;

/**
 * Type for log function in test context.
 */
export type Log = ((message: string, payload?: LogPayload, logEventType?: LogEventType) => void) &
  ((message: string, logEventType: LogEventType) => void);
