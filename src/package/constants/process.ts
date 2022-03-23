/**
 * Exit status of e2ed process.
 */
export const enum ExitStatus {
  Passed,
  Failed,
  NoRetries,
  NoReportData,
}

/**
 * Run environment (run in docker or local run).
 */
export const enum RunEnvironment {
  Docker = 'docker',
  Local = 'local',
}
