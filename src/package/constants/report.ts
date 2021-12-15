/**
 * Main status of test run.
 * Failed if it have errors and passed if not.
 * @internal
 */
export const enum TestRunStatus {
  Passed,
  Failed,
  Skipped,
  Broken,
  Unknown,
}

/**
 * Map test run status to element status modifier.
 */
export const TEST_RUN_STATUS_TO_MODIFIER_HASH = {
  [TestRunStatus.Passed]: 'passed',
  [TestRunStatus.Failed]: 'failed',
  [TestRunStatus.Broken]: 'broken',
  [TestRunStatus.Skipped]: 'skipped',
  [TestRunStatus.Unknown]: 'unknown',
} as const;
