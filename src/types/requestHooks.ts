import type {REQUEST_HOOK_CONTEXT_ID_KEY, REQUEST_HOOK_CONTEXT_KEY} from '../constants/internal';

import type {Brand} from './brand';
import type {Class} from './class';
import type {DeepReadonly} from './deep';
import type {Fn} from './fn';
import type {HeaderEntry, Headers, StatusCode} from './http';

/**
 * Maybe object with request hook context key.
 */
type MaybeWithContextKey =
  | {readonly [REQUEST_HOOK_CONTEXT_KEY]?: RequestHookContext}
  | null
  | undefined;

/**
 * TestCafe internal request hook context (BaseRequestHookEventFactory).
 * Here we describe only the specific fields used.
 * Only the version without native automation has field `_ctx`,
 * and only the version with native automation (CPD) has field `_event`.
 * {@link https://github.com/DevExpress/testcafe-hammerhead/blob/master/src/request-pipeline/request-hooks/events/factory/index.ts}
 * {@link https://github.com/DevExpress/testcafe/blob/master/src/native-automation/request-hooks/event-factory/request-paused-event-based.ts}
 * {@link https://github.com/DevExpress/testcafe/blob/master/src/native-automation/request-hooks/event-factory/frame-navigated-event-based.ts}
 */
type RequestHookContext = Readonly<{
  [REQUEST_HOOK_CONTEXT_ID_KEY]?: RequestHookContextId;
  _ctx?: Readonly<{destRes?: Readonly<{headers?: Headers}>}>;
  _event?: Readonly<{requestId: string; responseHeaders?: readonly HeaderEntry[]}>;
  headersModified?: boolean;
}>;

/**
 * TestCafe charset class instance for encode/decode request/response body buffers.
 * @internal
 */
// eslint-disable-next-line import/no-unused-modules
export type RequestHookCharset = Brand<object, 'RequestHookCharset'> & Readonly<{charset: string}>;

/**
 * Any internal TestCafe request hook class with request hook context.
 * @internal
 */
export type RequestHookClassWithContext = Class<
  unknown[],
  RequestHookContext & Readonly<Record<string, Fn<never[], MaybeWithContextKey>>>
>;

/**
 * id of TestCafe's request hook context.
 */
export type RequestHookContextId = Brand<string, 'RequestHookContextId'>;

/**
 * Encoding for encode/decode request/response body buffers.
 * @internal
 */
export type RequestHookEncoding = Brand<string, 'RequestHookEncoding'>;

/**
 * TestCafe internal request event in RequestHook.
 */
export type RequestHookRequestEvent = DeepReadonly<{
  _requestInfo?: {requestId?: string};
  requestOptions: RequestOptions;
}>;

/**
 * TestCafe internal configure response event in RequestHook.
 */
export type RequestHookConfigureResponseEvent = MaybeWithContextKey & {};

/**
 * TestCafe internal response event in RequestHook.
 */
export type RequestHookResponseEvent = Readonly<{
  body?: Buffer;
  headers?: Headers;
  requestId?: string;
  statusCode?: StatusCode;
}>;

/**
 * TestCafe internal request options with request hook context.
 */
export type RequestOptions = MaybeWithContextKey;
