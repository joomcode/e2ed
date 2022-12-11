/**
 * Maybe error params with optional field isTestRunBroken (or undefined).
 * The presence of such a field in a reject error results in
 * setting the test run status to a broken.
 * @internal
 */
export type MaybeWithIsTestRunBroken = {isTestRunBroken: unknown} | undefined;

/**
 * Original TestCafe test run error object.
 * @internal
 */
export type OriginalTestRunError = Readonly<{
  errMsg: string;
}>;
