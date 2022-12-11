import type {EndE2edReason, ExitCode, TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {TestFilePath} from './fs';
import type {StartInfo} from './startInfo';
import type {FullTestRun, LiteTestRun, RunHash, RunId} from './testRun';
import type {TestMetaPlaceholder} from './userland';

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
  summaryRunE2edResults: string;
}>;

/**
 * The lite report data (for printing lite JSON report) with userland meta.
 */
export type LiteReport<TestMeta = TestMetaPlaceholder> = Readonly<{
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  exitCode: ExitCode;
  liteReportFileName: string;
  retries: readonly LiteRetry<TestMeta>[];
  startInfo: StartInfo;
  summaryRunE2edResults: string;
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
 * Global state object on report html page.
 * @internal
 */
export type ReportClientState = {
  e2edClickListeners?: Record<string, (event: HTMLElement) => void>;
  e2edTestRunDetailsElementsByHash?: Record<RunHash, HTMLElement>;
  e2edFullTestRuns?: readonly FullTestRun[];
};

/**
 * Retry object with all his full test runs.
 * @internal
 */
export type Retry = Readonly<{
  concurrency: number;
  endTimeInMs: UtcTimeInMs;
  fullTestRuns: readonly FullTestRun[];
  retryIndex: number;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Lite retry object with all his lite test runs.
 */
export type LiteRetry<TestMeta = TestMetaPlaceholder> = Readonly<{
  brokenLiteTestRuns: readonly LiteTestRun<TestMeta>[];
  concurrency: number;
  endTimeInMs: UtcTimeInMs;
  /**
   * Test runs of all statuses except broken.
   */
  liteTestRuns: readonly LiteTestRun<TestMeta>[];
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
