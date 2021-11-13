import type {UnwrapPromise} from './utils';
import type {Inner} from 'testcafe-without-typecheck';

export * from './config';
export * from './log';
export * from './pages';
export * from './request';
export * from './utils';

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = Inner.SelectorAPI;

/**
 * Type of the wrapped client function.
 */
export type WrappedClientFunction<R, A extends unknown[]> = (
  ...args: A
) => Promise<UnwrapPromise<R> | undefined>;
