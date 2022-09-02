/**
 * Main status of test run.
 * Failed if it have run error and passed if not.
 * Broken if the test failed and TestCafe restarted it themself.
 */
export const enum TestRunStatus {
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
  Broken = 'broken',
  Manual = 'manual',
  Unknown = 'unknown',
}

/**
 * Statuses, the presence of which in the retray indicates
 * that there are failed tests in the retray.
 */
export const FAILED_TEST_RUN_STATUSES = [TestRunStatus.Failed, TestRunStatus.Unknown];
