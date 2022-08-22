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
 * Exit status of e2ed process.
 */
export const enum ExitStatus {
  Passed = 0,
  Failed = 1,
  NoRetries = 2,
  NoReportData = 3,
}
