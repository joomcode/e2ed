import type {IncomingHttpHeaders} from 'node:http';

import type {Brand} from '../brand';

import type {StatusCode} from './statusCode';

/**
 * Inner key for request type.
 */
declare const REQUEST_KEY: unique symbol;

/**
 * Inner key for response type.
 */
declare const RESPONSE_KEY: unique symbol;

/**
 * Cookie object.
 */
export type Cookie = Readonly<{name: string; value: string}>;

/**
 * HTTP headers.
 */
export type Headers = Readonly<IncomingHttpHeaders>;

/**
 * Map headers to new (overridden) headers.
 */
export type MapHeaders = (headers: Headers) => Partial<Headers>;

/**
 * Options for mappers of headers.
 */
export type MapOptions = Readonly<{
  mapRequestHeaders?: MapHeaders;
  mapResponseHeaders?: MapHeaders;
}>;

/**
 * HTTP method.
 */
export type Method =
  | 'HEAD'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

/**
 * Object with query (search) part of the url, or query string itself.
 */
export type Query =
  | Record<
      string,
      | string
      | number
      | boolean
      | readonly string[]
      | readonly number[]
      | readonly boolean[]
      | null
      | undefined
    >
  | string;

/**
 * HTTP request object.
 */
export type Request<
  RequestBody = unknown,
  SomeQuery extends Query = Query,
  RequestHeaders extends Headers = Headers,
  SomeMethod extends Method = Method,
> = Readonly<{
  method: SomeMethod;
  query: SomeQuery;
  requestBody: RequestBody;
  requestHeaders: RequestHeaders;
  url: Url;
}>;

/**
 * Type of inner key for request type.
 */
export type REQUEST_KEY_TYPE = typeof REQUEST_KEY;

/**
 * HTTP response object.
 */
export type Response<
  ResponseBody = unknown,
  ResponseHeaders extends Headers = Headers,
  SomeStatusCode extends StatusCode = StatusCode,
> = Readonly<{
  responseBody: ResponseBody;
  responseHeaders: ResponseHeaders;
  statusCode: SomeStatusCode;
}>;

/**
 * Type of inner key for response type.
 */
export type RESPONSE_KEY_TYPE = typeof RESPONSE_KEY;

/**
 * Brand type for the full url string.
 */
export type Url = Brand<string, 'Url'>;
