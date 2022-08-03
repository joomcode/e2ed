import type {UnwrapPromise} from './utils';

/**
 * Client properties for waiting for interface stabilization.
 */
type WaitingForInterfaceStabilization = {
  readonly promise: Promise<void>;
  stabilizationInterval: number;
};

/**
 * Resolve of one async client function.
 */
type E2edClientFunctionResolve = (() => void) | undefined;

/**
 * List of resolves for async client functions.
 */
export type E2edClientFunctionResolves = E2edClientFunctionResolve[];

/**
 * Global object on test page.
 * @internal
 */
export type TestClientGlobal = {
  e2edClientFunctionResolves?: E2edClientFunctionResolves;
  e2edWaitingForInterfaceStabilization?: WaitingForInterfaceStabilization | undefined;
} & Window;

/**
 * Type of the wrapped client function.
 */
export type WrappedClientFunction<R, A extends unknown[]> = (
  ...args: A
) => Promise<UnwrapPromise<R> | undefined>;
