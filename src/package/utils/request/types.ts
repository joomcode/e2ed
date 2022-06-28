import type {request as httpRequest} from 'node:http';

import type {Headers, Method, Response, Url} from '../../types/internal';

/**
 * Request log parameters.
 * @internal
 */
export type LogParams<RequestBody, RequestQuery> = Readonly<{
  headers: Headers | undefined;
  method: Method;
  query: RequestQuery | undefined;
  requestBody: string | RequestBody;
  retry: string | undefined;
  timeout: number;
  url: Url;
}>;

/**
 * Options of oneTryOfRequest function.
 * @internal
 */
export type OneTryOfRequestOptions<RequestBody, RequestQuery> = Readonly<{
  libRequest: typeof httpRequest;
  logParams: LogParams<RequestBody, RequestQuery>;
  options: Readonly<{method: Method; headers: Headers}>;
  requestBodyAsString: string;
  timeout: number;
  urlObject: URL;
}>;

/**
 * Options of request function.
 */
export type Options<RequestBody, ResponseBody, RequestQuery, RequestHeaders> = Readonly<{
  headers?: RequestHeaders;
  isNeedRetry?: (response: Response<ResponseBody>) => boolean;
  maxRetriesCount?: number;
  method?: Method;
  query?: RequestQuery;
  requestBody?: string | RequestBody;
  timeout?: number;
  url: Url;
}>;
