import type {Inner} from 'testcafe-without-typecheck';

import type {Brand} from './brand';
import type {DeepReadonly} from './deep';
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
 * TestCafe internal response event in RequestHook.
 */
export type RequestHookResponseEvent = DeepReadonly<{
  setHeader(name: string, value: string): Promise<void>;

  removeHeader(name: string): Promise<void>;

  _requestContext: {
    contentInfo: {charset: RequestHookCharset; encoding: RequestHookEncoding};
    destRes: {headers: Headers; statusCode: StatusCode};
    destResBody: Buffer;
  };
}>;
