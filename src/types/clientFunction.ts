import type {Void} from './undefined';

/**
 * Client function by arguments and return result.
 */
export type ClientFunction<Args extends readonly unknown[] = [], Result = Void> = (
  this: void,
  ...args: Args
) => Promise<Result>;

/**
 * Result of the internal client function wrapper (object with error as string or with value).
 * @internal
 */
export type ClientFunctionWrapperResult<Result = unknown> = Readonly<
  | {
      errorMessage: string;
      result: undefined;
    }
  | {
      errorMessage: undefined;
      result: Result;
    }
>;

/**
 * Internal TestCafe error object or undefined.
 * @internal
 */
export type MaybeTestCafeError = {code?: string} | undefined;
