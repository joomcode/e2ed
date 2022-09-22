/**
 * Status of LogEvent.
 */
export const enum LogEventStatus {
  Passed = 'passed',
  Failed = 'failed',
}

/**
 * Type of LogEvent.
 */
export const enum LogEventType {
  Action,
  Assert,
  Entity,
  Util,
  InternalAction,
  InternalAssert,
  InternalCore,
  InternalUtil,
  Unspecified,
}
