/**
 * Main status of test run.
 * Failed if it have errors and passed if not.
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
 * @internal
 */
export const TEST_STATUS_TO_STATUS_STRING = {
  [TestRunStatus.Passed]: 'passed',
  [TestRunStatus.Failed]: 'failed',
  [TestRunStatus.Broken]: 'broken',
  [TestRunStatus.Skipped]: 'skipped',
  [TestRunStatus.Unknown]: 'unknown',
} as const;
