import type {Inner} from 'testcafe-without-typecheck';

export * from './brand';
export * from './checks';
export * from './client';
export * from './config';
export * from './date';
export * from './deep';
export * from './environment';
export * from './errors';
export * from './events';
export * from './fs';
export * from './html';
export * from './http';
export * from './log';
export * from './mockApiRoute';
export * from './pages';
export * from './pixelmatch';
export * from './report';
export type {
  RequestHookCharset,
  RequestHookEncoding,
  RequestHookRequestContext,
  RequestHookRequestEvent,
  RequestHookResponseEvent,
} from './requestHooks';
export * from './retries';
export * from './routes';
export * from './runLabel';
export * from './skipTest';
export * from './stackTrack';
export * from './startInfo';
export * from './testCafe';
export * from './testRun';
export * from './undefined';
export * from './utils';
/** * @internal */
export type {
  RequestPredicateWithPromise,
  ResponsePredicateWithPromise,
  WaitForEventsState,
} from './waitForEvents';
export type {RequestPredicate, ResponsePredicate} from './waitForEvents';

/**
 * Selector type (which replaces the DOM element wrapper).
 */
export type Selector = Inner.SelectorAPI;
