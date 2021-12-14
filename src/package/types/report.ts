import type {UtcTimeInMs} from './date';
import type {RunE2edEvent, TestRun} from './events';

/**
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  startTimeInMs: UtcTimeInMs;
  finishTimeInMs: UtcTimeInMs;
  testRuns: TestRun[];
}> &
  Omit<RunE2edEvent, 'utcTimeInMs'>;
