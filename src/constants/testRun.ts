import type {Expect, RunId, TestRunEvent, Values} from '../types/internal';

/**
 * Internal type checks for test run types.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare type TestRunTypesChecks = [
  Expect<
    TestRunStatus extends Values<typeof ORDER_OF_TEST_RUN_STATUSES_FOR_SUMMARY_RESULTS, true>
      ? true
      : false
  >,
];

/**
 * Main status of test run.
 * Failed if it have run error and passed if not.
 * Broken if the test failed and TestCafe restarted it themself.
 */
export const enum TestRunStatus {
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
  Manual = 'manual',
  Unknown = 'unknown',
  Broken = 'broken',
}

/**
 * Statuses, the presence of which in the retray indicates * Userland types checks in the e2ed directory of the project.
 * that there are failed tests in the retray.
 */
export const FAILED_TEST_RUN_STATUSES: readonly TestRunStatus[] = [
  TestRunStatus.Failed,
  TestRunStatus.Unknown,
];

/**
 * Order of test run statuses for summary pack results.
 * @internal
 */
export const ORDER_OF_TEST_RUN_STATUSES_FOR_SUMMARY_RESULTS = [
  TestRunStatus.Passed,
  TestRunStatus.Failed,
  TestRunStatus.Skipped,
  TestRunStatus.Manual,
  TestRunStatus.Unknown,
  TestRunStatus.Broken,
] as const;

/**
 * Hash object with runId as keys and TestRunEvent as values.
 * @internal
 */
export const RUN_IDS_HASH: Record<RunId, TestRunEvent> = {};

/**
 * Test run statuses of unique tests (which are not repeated in different reteries).
 * @internal
 */
export const TEST_RUN_STATUSES_OF_UNIQUE_TESTS: readonly TestRunStatus[] = [
  TestRunStatus.Passed,
  TestRunStatus.Skipped,
  TestRunStatus.Manual,
];
