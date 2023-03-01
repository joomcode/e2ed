/**
 * Result of isTestSkipped hook (flag isSkipped and skipping reason).
 */
export type IsTestSkippedResult = Readonly<
  {isSkipped: false; reason?: string} | {isSkipped: true; reason: string}
>;
