import type {Inner} from 'testcafe-without-typecheck';

import type {REQUEST_HOOK_CONTEXT_KEY} from '../constants/internal';

import type {Brand} from './brand';
import type {Class} from './class';
import type {DeepReadonly} from './deep';
import type {Fn} from './fn';
import type {Headers, StatusCode} from './http';

/**
 * Maybe object with request hook context key.
 * @internal
 */
type MaybeWithContextKey = Partial<WithContextKey> | null | undefined;

/**
 * TestCafe internal request hook context (RequestPipelineContext).
 * Here we describe only the specific context fields used.
 * {@link https://github.com/DevExpress/testcafe-hammerhead/blob/master/src/request-pipeline/context/index.ts}
 */
type RequestHookContext = DeepReadonly<{
  destRes: {
    headers?: Headers;
  };
}>;

/**
 * Any object with request hook context key.
 */
type WithContextKey = {[REQUEST_HOOK_CONTEXT_KEY]: RequestHookContext};

/**
 * TestCafe charset class instance for encode/decode request/response body buffers.
 * @internal
 */
// eslint-disable-next-line import/no-unused-modules
export type RequestHookCharset = Brand<object, 'RequestHookCharset'>;

/**
 * Any internal TestCafe request hook class with request hook context.
 * @internal
 */
export type RequestHookClassWithContext = Class<
  unknown[],
  Readonly<{_ctx: RequestHookContext} & Record<string, Fn<never[], MaybeWithContextKey>>>
>;

/**
 * Encoding for encode/decode request/response body buffers.
 * @internal
 */
export type RequestHookEncoding = Brand<string, 'RequestHookEncoding'>;

/**
 * TestCafe internal request event in RequestHook.
 */
export type RequestHookRequestEvent = DeepReadonly<{
  requestOptions: WithContextKey & Inner.RequestOptions;
}>;

/**
 * TestCafe internal configure response event in RequestHook.
 */
export type RequestHookConfigureResponseEvent = DeepReadonly<
  WithContextKey & {
    _modifyResponseFunctions: {
      setHeader(name: string, value: string): Promise<void>;
      removeHeader(name: string): Promise<void>;
    };
  }
>;

/**
 * TestCafe internal response event in RequestHook.
 */
export type RequestHookResponseEvent = Readonly<{
  body?: Buffer;
  headers?: Headers;
  statusCode?: StatusCode;
}>;
