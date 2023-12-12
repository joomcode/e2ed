import type {IncomingHttpHeaders} from 'node:http';

import type {Brand} from '../brand';
import type {UtcTimeInMs} from '../date';

import type {CookieHeaderString, SetCookieHeaderString} from './cookie';
import type {StatusCode} from './statusCode';

/**
 * General type of arbitrary HTTP headers. All headers are in lower case.
 */
export type Headers = Readonly<
  Omit<IncomingHttpHeaders, 'cookie' | 'set-cookie'> & {
    cookie?: CookieHeaderString;
    'set-cookie'?: SetCookieHeaderString[];
  }
>;

/**
 * Maps headers to new (overridden) headers.
 * All headers must be in lower case.
 */
export type MapHeaders = (headers: Headers) => Headers;

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
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'TRACE';

/**
 * Object with query (search) part of the url, or query string itself.
 */
export type Query =
  | Readonly<
      Record<
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
  utcTimeInMs?: UtcTimeInMs;
}>;

/**
 * HTTP response object with its corresponding request.
 */
export type Response<
  ResponseBody = unknown,
  ResponseHeaders extends Headers = Headers,
  SomeStatusCode extends StatusCode = StatusCode,
  SomeRequest extends Request = Request,
> = Readonly<{
  completionTimeInMs?: UtcTimeInMs;
  duration?: string;
  request?: SomeRequest;
  responseBody: ResponseBody;
  responseHeaders: ResponseHeaders;
  statusCode: SomeStatusCode;
}>;

/**
 * Completed HTTP response with mandatory request.
 */
export type ResponseWithRequest<
  ResponseBody = unknown,
  ResponseHeaders extends Headers = Headers,
  SomeStatusCode extends StatusCode = StatusCode,
  SomeRequest extends Request = Request,
> = Required<
  Response<ResponseBody, ResponseHeaders, SomeStatusCode, SomeRequest & {utcTimeInMs: UtcTimeInMs}>
>;

/**
 * Brand type for the full url string.
 */
export type Url = Brand<string, 'Url'>;
