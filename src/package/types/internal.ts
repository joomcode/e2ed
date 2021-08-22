import type {UnwrapPromise} from './utils';

export * from './pages';
export * from './request';
export * from './utils';

/**
 * Type for log function.
 */
export type Log = (message: string, params?: Record<string, unknown>) => void;

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = SelectorAPI;

/**
 * Type of the wrapped client function.
 */
export type WrappedClientFunction<R, A extends unknown[]> = (
  ...args: A
) => Promise<UnwrapPromise<R> | undefined>;
