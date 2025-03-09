import type {EndE2edReason, LogEventType, TestRunStatus} from '../constants/internal';

import type {ApiStatistics} from './apiStatistics';
import type {UtcTimeInMs} from './date';
import type {LogPayload} from './log';
import type {TestFilePath} from './paths';
import type {RunLabel} from './runLabel';
import type {StartInfo} from './startInfo';
import type {FullTestRun, RejectTestRun, RunId, TestFn, TestStaticOptions} from './testRun';
import type {TestMetaPlaceholder} from './userland';

/**
 * Log event (on log call).
 */
export type LogEvent = Readonly<{
  message: string;
  payload: LogPayload | undefined;
  time: UtcTimeInMs;
  type: LogEventType;
}>;

/**
 * EndTestRun event (on closing test).
 * @internal
 */
export type EndTestRunEvent = Readonly<{
  hasRunError: boolean;
  runId: RunId;
  unknownRunError: unknown;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Object with full events data (for report).
 * @internal
 */
export type FullEventsData = Readonly<{
  apiStatisticsOfTests: readonly ApiStatistics[];
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  fullTestRuns: readonly FullTestRun[];
  notIncludedInPackTests: readonly TestFilePath[];
  startInfo: StartInfo;
}>;

/**
 * Onlog test run callback.
 */
export type Onlog = () => void;

/**
 * TestRun event (on starting one test) with userland metadata.
 */
export type TestRunEvent<TestMeta = TestMetaPlaceholder> = Readonly<{
  logEvents: readonly LogEvent[];
  onlog: Onlog;
  outputDirectoryName: string;
  reject: RejectTestRun;
  retryIndex: number;
  runId: RunId;
  runLabel: RunLabel;
  status: TestRunStatus;
  testFnWithReject: TestFn;
  utcTimeInMs: UtcTimeInMs;
}> &
  TestStaticOptions<TestMeta>;
