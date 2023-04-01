/**
 * Reason of ending e2ed.
 */
export const enum EndE2edReason {
  LocalTestCafeRunEnded = 'localTestCafeRunEnded',
  PackTimeoutExpired = 'packTimeoutExpired',
  ProcessEndSignal = 'processEndSignal',
  RetriesCycleEnded = 'retriesCycleEnded',
  Unknown = 'unknown',
}

/**
 * Exit code of e2ed process.
 */
export const enum ExitCode {
  Passed = 0,
  Failed = 1,
  HasErrors = 2,
  NoRetries = 3,
  NoReportData = 4,
}
