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
