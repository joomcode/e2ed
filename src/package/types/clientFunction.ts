/**
 * Type of the internal client function wrapper.
 * @internal
 */
type ClientFunctionWrapper<Args extends readonly unknown[], R> = (
  ...args: Args
) => Promise<ClientFunctionWrapperResult<Awaited<R>>>;

/**
 * Client function call state.
 * @internal
 */
export type ClientFunctionState<Args extends unknown[], R> = {
  clientFunction: ClientFunctionWrapper<Args, R> | undefined;
  isClientFunctionAlreadyRerunned: boolean;
  readonly name: string;
  readonly originalFn: (this: void, ...args: Args) => R;
  readonly timeout: number | undefined;
};

/**
 * Result of the internal client function wrapper (object with error as string or with value).
 * @internal
 */
export type ClientFunctionWrapperResult<R = unknown> = Readonly<
  | {
      errorMessage: undefined;
      result: R;
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
