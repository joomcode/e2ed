import type {TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {E2edRunEvent} from './events';
import type {TestFilePath} from './fs';
import type {RunHash, RunId, TestRunWithHooks} from './testRun';

/**
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  startTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  endTimeInMs: UtcTimeInMs;
  name: string;
  testRunsWithHooks: readonly TestRunWithHooks[];
}> &
  Omit<E2edRunEvent, 'utcTimeInMs'>;

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
