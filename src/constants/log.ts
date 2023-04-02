import {ConsoleBackgroundColor} from './color';
import {TestRunStatus} from './testRun';

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

/**
 * Background color of log message by test run status.
 * @internal
 */
export const MESSAGE_BACKGROUND_COLOR_BY_STATUS: Readonly<
  Record<TestRunStatus, ConsoleBackgroundColor>
> = {
  [TestRunStatus.Failed]: ConsoleBackgroundColor.Red,
  [TestRunStatus.Unknown]: ConsoleBackgroundColor.Magenta,
  [TestRunStatus.Passed]: ConsoleBackgroundColor.GreenBright,
  [TestRunStatus.Skipped]: ConsoleBackgroundColor.BlackBright,
  [TestRunStatus.Manual]: ConsoleBackgroundColor.Green,
  [TestRunStatus.Broken]: ConsoleBackgroundColor.Yellow,
};
