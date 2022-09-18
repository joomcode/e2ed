import type {Inner} from 'testcafe-without-typecheck';

import type {Brand} from './brand';
import type {Headers, StatusCode} from './http';

/**
 * TestCafe charset class for encode/decode request/response body buffers.
 */
export type RequestHookCharset = Brand<object, 'RequestHookCharset'>;

/**
 * Encoding for encode/decode request/response body buffers.
 */
export type RequestHookEncoding = Brand<string, 'RequestHookEncoding'>;

/**
 * TestCafe internal request event in RequestHook.
 */
export type RequestHookRequestEvent = Readonly<{
  requestOptions: Inner.RequestOptions;
}>;

/**
 * TestCafe internal request context of response event in RequestHook.
 */
export type RequestHookRequestContext = Readonly<{
  contentInfo: Readonly<{charset: RequestHookCharset; encoding: RequestHookEncoding}>;
  destRes: {headers?: Headers; statusCode?: StatusCode};
  destResBody: Buffer;
}>;

/**
 * TestCafe internal response event in RequestHook.
 */
export type RequestHookResponseEvent = Readonly<{
  setHeader(name: string, value: string): Promise<void>;
  removeHeader(name: string): Promise<void>;
  _requestContext: RequestHookRequestContext;
}>;
