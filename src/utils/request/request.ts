import {request as httpRequest} from 'node:http';
import {request as httpsRequest} from 'node:https';
import {URL} from 'node:url';

import {BAD_REQUEST_STATUS_CODE, LogEventStatus, LogEventType} from '../../constants/internal';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {log} from '../log';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {wrapInTestRunTracker} from '../testRun';

import {getBodyAsString} from './getBodyAsString';
import {getContentJsonHeaders} from './getContentJsonHeaders';
import {oneTryOfRequest} from './oneTryOfRequest';

import type {
  ApiRouteClassType,
  Request,
  Response,
  ResponseWithRequest,
  ZeroOrOneArg,
} from '../../types/internal';

import type {LogParams, Options} from './types';

const defaultIsNeedRetry = <SomeResponse extends Response>({statusCode}: SomeResponse): boolean =>
  statusCode >= BAD_REQUEST_STATUS_CODE;

/**
 * Send a request to the (JSON) API by `Route`, route parameters, headers,
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
  }: Options<RouteParams, SomeRequest, SomeResponse> = {} as unknown as Options<
    RouteParams,
    SomeRequest,
    SomeResponse
  >,
): Promise<ResponseWithRequest<SomeResponse, SomeRequest>> => {
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
  const libRequest = wrapInTestRunTracker(
    urlObject.protocol === 'http:' ? httpRequest : httpsRequest,
  );

  setReadonlyProperty(logParams, 'requestHeaders', requestHeaders);

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    try {
      const {fullLogParams, response} = await oneTryOfRequest<SomeRequest, SomeResponse>({
        isResponseBodyInJsonFormat,
        libRequest,
        logParams: {...logParams, retry},
        options,
        requestBody,
        requestBodyAsString,
        timeout,
        urlObject,
      });
      const needRetry = await isNeedRetry(response);

      log(
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
      setReadonlyProperty(logParams, 'cause', cause);

      log(
        `An error was received during the request to ${url}`,
        {...logParams, logEventStatus: LogEventStatus.Failed, retry},
        LogEventType.InternalUtil,
      );
    }
  }

  throw new E2edError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
