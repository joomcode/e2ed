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
  | 'entity'
  | 'util'
  | 'internalAction'
  | 'internalAssert'
  | 'internalCore'
  | 'internalUtil'
  | 'unspecified';

/**
 * Type for log function in test context.
 */
export type Log = ((
  message: string,
  payload?: LogPayload,
  logEventType?: LogEventType,
) => Promise<void>) &
  ((message: string, logEventType: LogEventType) => Promise<void>);
