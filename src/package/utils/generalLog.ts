/**
 * General (out of test context) log to stdout.
 */
export const generalLog = (message: string): void =>
  // eslint-disable-next-line no-console
  console.log(`[e2ed][${new Date().toISOString()}] ${message}\n`);
