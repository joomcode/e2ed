/**
 * TestRun error object.
 */
export type TestRunError = Readonly<{
  message: string;
}>;

/**
 * Original TestCafe test run error object.
 */
export type OriginalTestRunError = Readonly<{
  errMsg: string;
}>;
