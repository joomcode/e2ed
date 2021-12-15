import type {TestRunStatus} from '../constants/internal';
import type {UtcTimeInMs} from './date';
import type {RunE2edEvent, TestRun} from './events';
import type {RunId} from './test';

/**
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  startTimeInMs: UtcTimeInMs;
  finishTimeInMs: UtcTimeInMs;
  testRuns: readonly TestRun[];
}> &
  Omit<RunE2edEvent, 'utcTimeInMs'>;

/**
 * TestRunButton component props.
 * @internal
 */
export type TestRunButtonProps = Readonly<{
  filePath: string;
  name: string;
  runId: RunId;
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
