import type {Inner} from 'testcafe-without-typecheck';

/**
 * Browser's JS-error from TestCafe.
 */
export type BrowserJsError = Readonly<
  Exclude<Parameters<Inner.SkipJsErrorsCallbackWithOptionsObject['fn']>[0], undefined>
>;

/**
 * Maybe error params with optional field isTestRunBroken (or undefined).
 * The presence of such a field in a reject error results in
 * setting the test run status to a broken.
 * @internal
 */
export type MaybeWithIsTestRunBroken = Readonly<{isTestRunBroken: unknown}> | undefined;

/**
 * Original TestCafe test run error object.
 * @internal
 */
export type OriginalTestRunError = Readonly<{errMsg: string}>;
