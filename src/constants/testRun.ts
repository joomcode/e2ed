import type {Expect, RunId, TestRunEvent, Values} from '../types/internal';

/**
 * Internal type checks for test run types.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare type TestRunTypesChecks = [
  Expect<
    TestRunStatus extends Values<typeof ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY, true> ? true : false
  >,
];

/**
 * Main status of test run.
 * Failed if it have run error and passed if not.
 * Broken if the test failed and TestCafe restarted it themself.
 */
export const enum TestRunStatus {
  Broken = 'broken',
  Failed = 'failed',
  Manual = 'manual',
  Passed = 'passed',
  Skipped = 'skipped',
  Unknown = 'unknown',
}

/**
 * Statuses, the presence of which in the retry indicates that there are failed tests in the retry.
 */
export const FAILED_TEST_RUN_STATUSES: readonly TestRunStatus[] = [
  TestRunStatus.Failed,
  TestRunStatus.Unknown,
];

/**
 * Order of test run statuses for display in summary pack results, in HTML report, etc.
 * @internal
 */
export const ORDER_OF_TEST_RUN_STATUSES_FOR_DISPLAY = [
  TestRunStatus.Failed,
  TestRunStatus.Unknown,
  TestRunStatus.Passed,
  TestRunStatus.Skipped,
  TestRunStatus.Manual,
  TestRunStatus.Broken,
] as const satisfies readonly TestRunStatus[];

/**
 * Hash object with runId as keys and TestRunEvent as values.
 * @internal
 */
export const RUN_IDS_HASH = Object.create(null) as Record<RunId, TestRunEvent>;

/**
 * Emoji symbols of test run statuses for display in logs and in the report.
 * @internal
 */
export const TEST_RUN_STATUS_SYMBOLS = {
  [TestRunStatus.Failed]: '×',
  [TestRunStatus.Unknown]: '?',
  [TestRunStatus.Passed]: '✓',
  [TestRunStatus.Skipped]: '−',
  [TestRunStatus.Manual]: '⚒',
  [TestRunStatus.Broken]: '⊘',
};

/**
 * Test run statuses of unique tests (which are not repeated in different reteries).
 * @internal
 */
export const TEST_RUN_STATUSES_OF_UNIQUE_TESTS: readonly TestRunStatus[] = [
  TestRunStatus.Passed,
  TestRunStatus.Skipped,
  TestRunStatus.Manual,
];
