import type {EndE2edReason, ExitCode, TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {TestFilePath} from './fs';
import type {StartInfo} from './startInfo';
import type {FullTestRun, LiteTestRun, RunHash, RunId} from './testRun';

/**
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  exitCode: ExitCode;
  fullTestRuns: readonly FullTestRun[];
  liteReportFileName: string | null;
  reportFileName: string | null;
  retries: readonly Retry[];
  startInfo: StartInfo;
}>;

/**
 * The lite report data (for printing lite JSON report).
 */
export type LiteReport = Readonly<{
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  exitCode: ExitCode;
  liteReportFileName: string;
  retries: readonly LiteRetry[];
  startInfo: StartInfo;
}>;

/**
 * RetryButton component props.
 * @internal
 */
export type RetryButtonProps = Readonly<{
  disabled: boolean;
  retry: number;
  selected: boolean;
}>;

/**
 * TestRunButton component props.
 * @internal
 */
export type TestRunButtonProps = Readonly<{
  endTimeInMs: UtcTimeInMs;
  filePath: TestFilePath;
  mainParams: string;
  name: string;
  runHash: RunHash;
  runId: RunId;
  startTimeInMs: UtcTimeInMs;
  status: TestRunStatus;
}>;

/**
 * Global object on report html page.
 * @internal
 */
export type ReportClientGlobal = {
  e2edClickListeners?: Record<string, (event: HTMLElement) => void>;
  e2edTestRunDetailsElementsByHash?: Record<RunHash, HTMLElement>;
  e2edFullTestRuns?: readonly FullTestRun[];
} & Window;

/**
 * Retry object with all his full test runs.
 * @internal
 */
export type Retry = Readonly<{
  endTimeInMs: UtcTimeInMs;
  fullTestRuns: readonly FullTestRun[];
  retryIndex: number;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Lite retry object with all his lite test runs.
 */
export type LiteRetry = Readonly<{
  brokenLiteTestRuns: readonly LiteTestRun[];
  endTimeInMs: UtcTimeInMs;
  liteTestRuns: readonly LiteTestRun[];
  retryIndex: number;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Retry component props.
 * @internal
 */
export type RetryProps = Readonly<{
  endTimeInMs: UtcTimeInMs;
  hidden: boolean;
  retryIndex: number;
  startTimeInMs: UtcTimeInMs;
  testRunButtons: readonly TestRunButtonProps[];
}>;
