/**
 * Main status of test run.
 * Failed if it have errors and passed if not.
 * Broken if the test failed and TestCafe restarted it themself.
 */
export enum TestRunStatus {
  Passed,
  Failed,
  Skipped,
  Broken,
  Unknown,
}

/**
 * Statuses, the presence of which in the retray indicates
 * that there are failed tests in the retray.
 */
export const FAILED_TEST_RUN_STATUSES = [TestRunStatus.Failed, TestRunStatus.Unknown];

/**
 * Map test run status to element status modifier.
 * @internal
 */
export const TEST_STATUS_TO_STATUS_STRING = {
  [TestRunStatus.Passed]: 'passed',
  [TestRunStatus.Failed]: 'failed',
  [TestRunStatus.Broken]: 'broken',
  [TestRunStatus.Skipped]: 'skipped',
  [TestRunStatus.Unknown]: 'unknown',
} as const;
