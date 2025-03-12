import type {EndE2edReason, ExitCode, TestRunStatus} from '../constants/internal';

import type {ApiStatistics} from './apiStatistics';
import type {FullPackConfig} from './config';
import type {UtcTimeInMs} from './date';
import type {TestFilePath} from './paths';
import type {StartInfo} from './startInfo';
import type {FullTestRun, LiteTestRun, RunHash, RunId} from './testRun';
import type {
  CustomPackPropertiesPlaceholder,
  CustomReportPropertiesPlaceholder,
  SkipTestsPlaceholder,
  TestMetaPlaceholder,
} from './userland';

/**
 * The lite report data (for printing lite JSON report) with userland meta.
 */
export type LiteReport<
  CustomPackProperties = CustomPackPropertiesPlaceholder,
  CustomReportProperties = CustomReportPropertiesPlaceholder,
  SkipTests = SkipTestsPlaceholder,
  TestMeta = TestMetaPlaceholder,
> = Readonly<{
  afterPackExecutionTimeWithUnits: string;
  apiStatistics: ApiStatistics;
  customReportProperties: CustomReportProperties | undefined;
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  exitCode: ExitCode;
  failedTestsMainParams: readonly string[];
  liteReportFileName: string;
  retries: readonly LiteRetry<TestMeta>[];
  startInfo: StartInfo<
    FullPackConfig<CustomPackProperties, CustomReportProperties, SkipTests, TestMeta>
  >;
  summaryPackResults: string;
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
 * The complete report data (for printing report).
 * @internal
 */
export type ReportData = Readonly<{
  apiStatistics: ApiStatistics;
  customReportProperties: CustomReportPropertiesPlaceholder | undefined;
  endE2edReason: EndE2edReason;
  endTimeInMs: UtcTimeInMs;
  errors: readonly string[];
  exitCode: ExitCode;
  failedTestsMainParams: readonly string[];
  fullTestRuns: readonly FullTestRun[];
  liteReportFileName: string | null;
  logFileName: string | null;
  notIncludedInPackTests: readonly TestFilePath[];
  reportFileName: string | null;
  retries: readonly Retry[];
  startInfo: StartInfo;
  summaryPackResults: string;
}>;

/**
 * The general report data that needed on client for rendering parts of HTML report.
 * @internal
 */
export type ReportClientData = Readonly<{
  apiStatistics: ApiStatistics;
}>;

/**
 * Global state object on HTML report page.
 * @internal
 */
export type ReportClientState = {
  clickListeners?: Record<string, (event: HTMLElement) => void>;
  readonly fullTestRuns: readonly FullTestRun[];
  readonly internalDirectoryName: string;
  lengthOfReadedJsonReportDataParts: number;
  readonly pathToScreenshotsDirectoryForReport: string | null;
  readonly readJsonReportDataObservers: MutationObserver[];
  reportClientData?: ReportClientData;
  testRunDetailsElementsByHash?: Record<RunHash, HTMLElement>;
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
 * RetryButton component props.
 * @internal
 */
export type RetryButtonProps = Readonly<{
  disabled: boolean;
  retry: number;
  selected: boolean;
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

/**
 * JSON data in `<script>` tags with JSON presentation of report data.
 * @internal
 */
export type ScriptJsonData = ReportClientData | readonly FullTestRun[];

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
