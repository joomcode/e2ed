/**
 * Client's properties for waiting for interface stabilization.
 * @internal
 */
type WaitingForInterfaceStabilization = {
  readonly promise: Promise<string | undefined>;
  stabilizationInterval: number;
};

declare const e2edWaitingForInterfaceStabilizationSymbol: unique symbol;

/**
 * Type of the internal client function wrapper.
 * @internal
 */
export type ClientFunctionWrapper<Args extends readonly unknown[], R> = (
  ...args: Args
) => Promise<ClientFunctionWrapperResult<Awaited<R>>>;

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
 * Symbol of client's properties for waiting for interface stabilization.
 * @internal
 */
export type E2edWaitingForInterfaceStabilizationSymbol =
  typeof e2edWaitingForInterfaceStabilizationSymbol;

/**
 * Global object on test page.
 * @internal
 */
export type TestClientGlobal = {
  [e2edWaitingForInterfaceStabilizationSymbol]?: WaitingForInterfaceStabilization | undefined;
} & Window;
