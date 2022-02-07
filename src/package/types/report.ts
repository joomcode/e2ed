import type {TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {E2edRunEvent, RunEnvironment} from './events';
import type {TestFilePath} from './fs';
import type {FullTestRun, LiteTestRun, RunHash, RunId, TestRunWithHooks} from './testRun';

/**
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  errors: readonly string[];
  endTimeInMs: UtcTimeInMs;
  fullTestRuns: readonly FullTestRun[];
  name: string;
  retries: readonly Retry[];
  startTimeInMs: UtcTimeInMs;
}> &
  Omit<E2edRunEvent, 'utcTimeInMs'>;

/**
 * The lite report data (for printing lite JSON report).
 */
export type LiteReport = Readonly<{
  concurrency: number;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  name: string;
  retries: readonly LiteRetry[];
  runEnvironment: RunEnvironment;
  startMessage: string;
  startTimeInMs: UtcTimeInMs;
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
  e2edTestRunDetailsElementsByHash?: Record<RunHash, HTMLElement>;
  e2edTestRunsWithHooks?: TestRunWithHooks[];
} & Window;

/**
 * Retry object with all his full test runs.
 * @internal
 */
export type Retry = Readonly<{
  endTimeInMs: UtcTimeInMs;
  fullTestRuns: readonly FullTestRun[];
  retry: number;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Lite retry object with all his lite test runs.
 */
export type LiteRetry = Readonly<{
  endTimeInMs: UtcTimeInMs;
  liteTestRuns: readonly LiteTestRun[];
  retry: number;
  startTimeInMs: UtcTimeInMs;
}>;

/**
 * Retry component props.
 * @internal
 */
export type RetryProps = Readonly<{
  endTimeInMs: UtcTimeInMs;
  hidden: boolean;
  retry: number;
  startTimeInMs: UtcTimeInMs;
  testRunButtons: readonly TestRunButtonProps[];
}>;
