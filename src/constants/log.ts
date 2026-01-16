import {ConsoleBackgroundColor} from './color';
import {TestRunStatus} from './testRun';

/**
 * Additional timeout for steps inside actions.
 * @internal
 */
export const ADDITIONAL_STEP_TIMEOUT = 1_000;

/**
 * Message of log for backend responses.
 */
export const BACKEND_RESPONSES_LOG_MESSAGE = 'Got a backend responses to log';

/**
 * Status of `LogEvent`.
 */
export const enum LogEventStatus {
  Failed = 'failed',
  Passed = 'passed',
}

/**
 * Type of `LogEvent`.
 */
export const enum LogEventType {
  Action = 1,
  Assert = 2,
  Entity = 3,
  Util = 4,
  InternalAction = 5,
  InternalAssert = 6,
  InternalCore = 7,
  InternalUtil = 8,
  Unspecified = 9,
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
  [TestRunStatus.Passed]: ConsoleBackgroundColor.Green,
  [TestRunStatus.Skipped]: ConsoleBackgroundColor.BlackBright,
  [TestRunStatus.Manual]: ConsoleBackgroundColor.YellowGreen,
  [TestRunStatus.Broken]: ConsoleBackgroundColor.Yellow,
};
