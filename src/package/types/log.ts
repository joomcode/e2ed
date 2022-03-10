import type {LogEventStatus, LogEventType} from '../constants/internal';

/**
 * Payload of log event.
 */
export type LogPayload = {
  [x: string]: unknown;
  logEventStatus?: LogEventStatus;
};

/**
 * Type for generallog log.
 */
export type GeneralLog = (message: string, payload?: LogPayload) => void;

/**
 * Context of log event.
 */
export type LogContext = Record<string, unknown>;

/**
 * Type for log function in test context.
 */
export type Log = ((
  message: string,
  payload?: LogPayload,
  logEventType?: LogEventType,
) => Promise<void>) &
  ((message: string, logEventType: LogEventType) => Promise<void>);
