import type {request as httpRequest} from 'node:http';

import type {Headers, Method, Response, Url} from '../../types/internal';

/**
 * Request log parameters.
 * @internal
 */
export type LogParams<RequestBody, SomeQuery> = Readonly<{
  requestHeaders: Headers | undefined;
  method: Method;
  query: SomeQuery | undefined;
  requestBody: string | RequestBody;
  retry: string | undefined;
  timeout: number;
  url: Url;
}>;

/**
 * Options of oneTryOfRequest function.
 * @internal
 */
export type OneTryOfRequestOptions<RequestBody, SomeQuery> = Readonly<{
  libRequest: typeof httpRequest;
  logParams: LogParams<RequestBody, SomeQuery>;
  options: Readonly<{method: Method; requestHeaders: Headers}>;
  requestBodyAsString: string;
  timeout: number;
  urlObject: URL;
}>;

/**
 * Options of request function.
 */
export type Options<RequestBody, ResponseBody, SomeQuery, RequestHeaders> = Readonly<{
  requestHeaders?: RequestHeaders;
  isNeedRetry?: (response: Response<ResponseBody>) => boolean;
  maxRetriesCount?: number;
  method?: Method;
  query?: SomeQuery;
  requestBody?: string | RequestBody;
  timeout?: number;
  url: Url;
}>;
