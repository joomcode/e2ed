import {request as httpRequest} from 'node:http';
import {request as httpsRequest} from 'node:https';
import {URL} from 'node:url';

import {LogEventStatus, LogEventType} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {log} from '../log';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import {getContentJsonHeaders} from './getContentJsonHeaders';
import {getRequestBodyAsString} from './getRequestBodyAsString';
import {oneTryOfRequest} from './oneTryOfRequest';

import type {
  ApiRouteClassType,
  Mutable,
  Request,
  Response,
  ZeroOrOneArg,
} from '../../types/internal';

import type {LogParams, Options} from './types';

const defaultIsNeedRetry = <SomeResponse extends Response>({statusCode}: SomeResponse): boolean =>
  statusCode >= 400;

/**
 * Send a request to the (JSON) API by Route, route parameters, headers,
 * post-data, timeout and number of retries.
 */
export const request = async <
  RouteParams,
  SomeRequest extends Request,
  SomeResponse extends Response,
>(
  Route: ApiRouteClassType<RouteParams, SomeRequest, SomeResponse>,
  {
    isNeedRetry = defaultIsNeedRetry,
    maxRetriesCount = 5,
    requestHeaders,
    requestBody,
    routeParams,
    timeout = 30_000,
  }: Options<RouteParams, SomeRequest, SomeResponse>,
): Promise<SomeResponse> => {
  const route = new Route(...([routeParams] as ZeroOrOneArg<RouteParams>));

  const method = route.getMethod();
  const url = route.getUrl();

  const urlObject = new URL(url);
  const logParams: LogParams = {
    method,
    requestBody,
    requestHeaders,
    retry: undefined,
    timeout,
    url,
  };

  const requestBodyAsString = getRequestBodyAsString(requestBody);
  const options = {
    method,
    requestHeaders: {
      ...getContentJsonHeaders(requestBodyAsString),
      ...requestHeaders,
    },
  };
  const libRequest = wrapInTestRunTracker(
    urlObject.protocol === 'http:' ? httpRequest : httpsRequest,
  );

  (logParams as Mutable<typeof logParams>).requestHeaders = options.requestHeaders;

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    try {
      const {fullLogParams, response} = await oneTryOfRequest<SomeResponse>({
        libRequest,
        logParams: {...logParams, retry},
        options,
        requestBodyAsString,
        timeout,
        urlObject,
      });
      const needRetry = await isNeedRetry(response);

      await log(
        `Got a response to the request to ${url}`,
        {
          ...fullLogParams,
          logEventStatus: needRetry ? LogEventStatus.Failed : LogEventStatus.Passed,
          needRetry,
          response,
        },
        LogEventType.InternalUtil,
      );

      if (needRetry === false) {
        return response;
      }
    } catch (cause) {
      await log(
        `An error was received during the request to ${url}`,
        {...logParams, cause, logEventStatus: LogEventStatus.Failed, retry},
        LogEventType.InternalUtil,
      );
    }
  }

  throw new E2EDError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
