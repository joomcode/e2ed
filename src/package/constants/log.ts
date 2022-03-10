/**
 * Type of LogEvent.
 */
export const enum LogEventType {
  Action,
  Entity,
  Util,
  InternalAction,
  InternalAssert,
  InternalCore,
  InternalUtil,
  Unspecified,
}

/**
 * Status of LogEvent.
 */
export const enum LogEventStatus {
  Passed,
  Failed,
}
