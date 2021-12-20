import type {Inner} from 'testcafe-without-typecheck';

export * from './brand';
export * from './config';
export * from './date';
export * from './deep';
export * from './errors';
export * from './events';
export * from './fs';
export * from './log';
export * from './pages';
export * from './report';
export * from './request';
export * from './stackTrack';
export * from './subprocess';
export * from './testRun';
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
) => Promise<Awaited<R> | undefined>;
