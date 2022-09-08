import type {request as httpRequest} from 'node:http';

import type {
  Headers,
  Method,
  OptionalIfValueIncludeDefault,
  Request,
  Response,
  Url,
} from '../../types/internal';

/**
 * Request log parameters.
 * @internal
 */
export type LogParams = Readonly<{
  requestHeaders: Headers | undefined;
  method: Method;
  requestBody: unknown;
  retry: string | undefined;
  timeout: number;
  url: Url;
}>;

/**
 * Options of oneTryOfRequest function.
 * @internal
 */
export type OneTryOfRequestOptions = Readonly<{
  libRequest: typeof httpRequest;
  logParams: LogParams;
  options: Readonly<{method: Method; requestHeaders: Headers}>;
  requestBodyAsString: string;
  responseBodyIsInJsonFormat: boolean;
  timeout: number;
  urlObject: URL;
}>;

/**
 * Options of request function.
 */
export type Options<
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
> = Readonly<
  {
    isNeedRetry?: (response: SomeResponse) => Promise<boolean> | boolean;
    maxRetriesCount?: number;
    timeout?: number;
  } & OptionalIfValueIncludeDefault<'requestBody', SomeRequest['requestBody'], undefined> &
    OptionalIfValueIncludeDefault<'requestHeaders', SomeRequest['requestHeaders'], Headers> &
    OptionalIfValueIncludeDefault<'routeParams', RouteParams, undefined>
>;
