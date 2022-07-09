import type {IncomingHttpHeaders} from 'node:http';

import type {Brand} from '../brand';

import type {StatusCode} from './statusCode';

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
  RequestBody,
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
 * Brand type for the full url string.
 */
export type Url = Brand<string, 'Url'>;
