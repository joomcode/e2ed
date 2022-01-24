import type {request as httpRequest} from 'http';

import type {DeepReadonly, Headers as AnyHeaders, Method, Url} from '../../types/internal';

/**
 * Request log parameters.
 * @todo Replace Record<...> with exact fields.
 * @internal
 */
export type LogParams = Readonly<{url: Url}> & Record<string, unknown>;

/**
 * Options of oneTryOfRequest function.
 * @internal
 */
export type OneTryOfRequestOptions = DeepReadonly<{
  urlObject: URL;
  options: {method: Method; headers: AnyHeaders};
  inputAsString: string;
  libRequest: typeof httpRequest;
  timeout: number;
  logParams: LogParams;
}>;

/**
 * Options of request function.
 */
export type Options<Input, Output, Query, Headers> = DeepReadonly<{
  url: Url;
  query?: Query;
  method?: Method;
  headers?: Headers;
  input?: string | Input;
  timeout?: number;
  maxRetriesCount?: number;
  isNeedRetry?: (response: Response<Output>) => boolean;
}>;

/**
 * Response object of request function.
 */
export type Response<Output> = DeepReadonly<{
  statusCode: number;
  headers: AnyHeaders;
  output: Output;
}>;
