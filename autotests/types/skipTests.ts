/**
 * Group of skipped tests, grouped by skip reason.
 */
type GroupOfSkippedTests = Readonly<{
  reason: string;
  testIds: readonly string[];
  unskipTaskUrl: string;
}>;

/**
 * This is the type of the "skipTests" field in the e2ed config,
 * which describes the set of tests that need to be skipped.
 */
export type SkipTests = Readonly<{reason: string; skipAll: true}> | readonly GroupOfSkippedTests[];
