import type {UnwrapPromise} from './promise';

/**
 * Client's properties for waiting for interface stabilization.
 * @internal
 */
type WaitingForInterfaceStabilization = {
  readonly promise: Promise<string | undefined>;
  stabilizationInterval: number;
};

/**
 * Resolve of one async client function.
 * @internal
 */
type E2edClientFunctionResolve = ((value: unknown) => void) | undefined;

declare const e2edClientFunctionResolvesSymbol: unique symbol;
declare const e2edWaitingForInterfaceStabilizationSymbol: unique symbol;

/**
 * Symbol of list of resolves for async client functions.
 * @internal
 */
export type E2edClientFunctionResolvesSymbol = typeof e2edClientFunctionResolvesSymbol;

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
  [e2edClientFunctionResolvesSymbol]?: E2edClientFunctionResolve[];
  [e2edWaitingForInterfaceStabilizationSymbol]?: WaitingForInterfaceStabilization | undefined;
} & Window;

/**
 * Type of the wrapped client function.
 */
export type WrappedClientFunction<R, A extends unknown[]> = (
  ...args: A
) => Promise<UnwrapPromise<R> | undefined>;
