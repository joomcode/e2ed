/**
 * Type of the internal client function wrapper.
 * @internal
 */
type ClientFunctionWrapper<Args extends readonly unknown[], Result> = (
  ...args: Args
) => Promise<ClientFunctionWrapperResult<Awaited<Result>>>;

/**
 * Client function call state.
 * @internal
 */
export type ClientFunctionState<Args extends unknown[], Result> = {
  clientFunction: ClientFunctionWrapper<Args, Result> | undefined;
  readonly name: string;
  readonly originalFn: (this: void, ...args: Args) => Result;
  readonly timeout: number | undefined;
};

/**
 * Result of the internal client function wrapper (object with error as string or with value).
 * @internal
 */
export type ClientFunctionWrapperResult<Result = unknown> = Readonly<
  | {
      errorMessage: undefined;
      result: Result;
    }
  | {
      errorMessage: string;
      result: undefined;
    }
>;

/**
 * Internal TestCafe error object or undefined.
 * @internal
 */
export type MaybeTestCafeError = {code?: string} | undefined;
