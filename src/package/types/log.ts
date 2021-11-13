type Params = Record<string, unknown>;

/**
 * Type for generallog log.
 */
export type GeneralLog = (message: string, params?: Params) => void;

/**
 * Type of LogEvent.
 */
type LogEventType =
  | 'action'
  | 'util'
  | 'internalAction'
  | 'internalAssert'
  | 'internalCore'
  | 'internalUtil';

/**
 * Type for log function in test context.
 */
export type Log = ((
  message: string,
  params?: Params,
  logEventType?: LogEventType,
) => Promise<void>) &
  ((message: string, logEventType: LogEventType) => Promise<void>);
