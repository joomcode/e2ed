import type {IncomingHttpHeaders} from 'node:http';

import type {Brand} from '../brand';
import type {UtcTimeInMs} from '../date';

import type {CookieHeaderString, SetCookieHeaderString} from './cookie';
import type {StatusCode} from './statusCode';

/**
 * Header entry from CDP.
 * {@link https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#type-HeaderEntry}
 */
export type HeaderEntry = Readonly<{name: string; value: string}>;

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
export type MapHeaders = (this: void, headers: StringHeaders) => StringHeaders;

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
        | boolean
        | number
        | string
        | readonly boolean[]
        | readonly number[]
        | readonly string[]
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
}>;

/**
 * HTTP request object with creation time.
 */
export type RequestWithUtcTimeInMs<SomeRequest extends Request = Request> = SomeRequest &
  Readonly<{utcTimeInMs: UtcTimeInMs}>;

/**
 * HTTP response object with its corresponding request.
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
 * Completed HTTP response with mandatory request.
 */
export type ResponseWithRequest<
  SomeRequest extends Request = Request,
  SomeResponse extends Response = Response,
> = Readonly<{
  completionTimeInMs: UtcTimeInMs;
  duration: string;
  request: RequestWithUtcTimeInMs<SomeRequest>;
}> &
  SomeResponse;

/**
 * Headers as strings.
 */
export type StringHeaders = Readonly<Record<string, string>>;

/**
 * Brand type for the full url string.
 */
export type Url = Brand<string, 'Url'>;
