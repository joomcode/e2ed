import {request as httpRequest} from 'node:http';
import {request as httpsRequest} from 'node:https';

import {BAD_REQUEST_STATUS_CODE, LogEventStatus, LogEventType} from '../../constants/internal';
import {getFullMocksState} from '../../context/fullMocks';

import {E2edError} from '../error';
import {log} from '../log';
import {setReadonlyProperty} from '../object';

import {getFullMocksResponse} from './getFullMocksResponse';
import {getPreparedOptions} from './getPreparedOptions';
import {getResponse} from './getResponse';

import type {ApiRouteClassType, Request, Response, ResponseWithRequest} from '../../types/internal';

import type {Options} from './types';

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
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  }: Options<RouteParams, SomeRequest, SomeResponse> = {} as Options<
    RouteParams,
    SomeRequest,
    SomeResponse
  >,
): Promise<ResponseWithRequest<SomeRequest, SomeResponse>> => {
  const {isResponseBodyInJsonFormat, logParams, options, requestBodyAsString, url, urlObject} =
    getPreparedOptions(Route, {requestBody, requestHeaders, routeParams, timeout});

  const fullMocksState = getFullMocksState();

  if (fullMocksState?.appliedMocks !== undefined) {
    const response = getFullMocksResponse(fullMocksState, logParams, urlObject);

    return response as ResponseWithRequest<SomeRequest, SomeResponse>;
  }

  const libRequest = urlObject.protocol === 'http:' ? httpRequest : httpsRequest;

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    setReadonlyProperty(logParams, 'retry', retry);

    try {
      const response = await getResponse({
        isNeedRetry,
        isResponseBodyInJsonFormat,
        libRequest,
        logParams,
        options,
        requestBody,
        requestBodyAsString,
        timeout,
        url,
        urlObject,
      });

      if (response !== undefined) {
        return response;
      }

      setReadonlyProperty(logParams, 'cause', 'isNeedRetry returns true');
    } catch (cause) {
      setReadonlyProperty(logParams, 'cause', cause);

      log(
        `An error was received during the request to ${url}`,
        {...logParams, logEventStatus: LogEventStatus.Failed},
        LogEventType.InternalUtil,
      );
    }
  }

  throw new E2edError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
