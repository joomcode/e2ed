import type {TestRunStatus} from '../constants/internal';

import type {UtcTimeInMs} from './date';
import type {E2edRunEvent} from './events';
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
  durationInMs: number;
  filePath: string;
  mainParams: string;
  name: string;
  runHash: RunHash;
  runId: RunId;
  startTimeInMs: UtcTimeInMs;
  status: TestRunStatus;
}>;

/**
 * TestRunsList component props.
 * @internal
 */
export type TestRunsListProps = Readonly<{
  hidden: boolean;
  retry: number;
  testRunButtons: readonly TestRunButtonProps[];
}>;
