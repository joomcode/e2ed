/**
 * Type of LogEvent.
 */
export enum LogEventType {
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

/**
 * Status of LogEvent.
 */
export enum LogEventStatus {
  Passed,
  Failed,
}

/**
 * LogEvent types for which a screenshot is taken.
 */
export const SCREENSHOT_EVENT_TYPES: readonly LogEventType[] = [];
