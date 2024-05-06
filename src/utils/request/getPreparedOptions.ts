import {URL} from 'node:url';

import {getDurationWithUnits} from '../getDurationWithUnits';
import {getBodyAsString, getContentJsonHeaders} from '../http';
import {setReadonlyProperty} from '../setReadonlyProperty';

import type {
  ApiRouteClassType,
  Headers,
  Method,
  Request,
  Response,
  Url,
  ZeroOrOneArg,
} from '../../types/internal';

import type {LogParams} from './types';

type Options<RouteParams> = Readonly<{
  requestBody: unknown;
  requestHeaders: Headers | undefined;
  routeParams: RouteParams | undefined;
  timeout: number;
}>;

type PreparedOptions = Readonly<{
  isResponseBodyInJsonFormat: boolean;
  logParams: LogParams;
  options: Readonly<{method: Method; requestHeaders: Headers}>;
  requestBodyAsString: string;
  url: Url;
  urlObject: URL;
}>;

/**
 * Get prepared `request` options by it's arguments.
 * @internal
 */
export const getPreparedOptions = <RouteParams>(
  Route: ApiRouteClassType<RouteParams, Request, Response>,
  {requestHeaders, requestBody, routeParams, timeout}: Options<RouteParams>,
): PreparedOptions => {
  const route = new Route(...([routeParams] as ZeroOrOneArg<RouteParams>));

  const method = route.getMethod();
  const isRequestBodyInJsonFormat = route.getIsRequestBodyInJsonFormat();
  const isResponseBodyInJsonFormat = route.getIsResponseBodyInJsonFormat();
  const url = route.getUrl();

  const urlObject = new URL(url);

  const timeoutWithUnits = getDurationWithUnits(timeout);
  const logParams: LogParams = {
    cause: undefined,
    method,
    requestBody,
    requestHeaders,
    retry: undefined,
    timeoutWithUnits,
    url,
  };

  const requestBodyAsString = getBodyAsString(requestBody, isRequestBodyInJsonFormat);
  const options = {
    method,
    requestHeaders: {
      ...getContentJsonHeaders(requestBodyAsString),
      ...requestHeaders,
    },
  };

  setReadonlyProperty(logParams, 'requestHeaders', options.requestHeaders);

  return {isResponseBodyInJsonFormat, logParams, options, requestBodyAsString, url, urlObject};
};
