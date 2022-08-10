/**
 * Type of LogEvent.
 */
export const enum LogEventType {
  Action,
  Assert,
  Entity,
  Test,
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

/**
 * LogEvent types for which a screenshot is taken.
 */
export const SCREENSHOT_EVENT_TYPES: readonly LogEventType[] = [];
