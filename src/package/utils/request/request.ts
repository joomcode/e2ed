import {request as httpRequest} from 'node:http';
import {request as httpsRequest} from 'node:https';
import {stringify} from 'node:querystring';
import {URL} from 'node:url';

import {LogEventType} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {log} from '../log';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import {oneTryOfRequest} from './oneTryOfRequest';

import type {Headers, Mutable, Query, Response} from '../../types/internal';

import type {LogParams, Options} from './types';

const defaultIsNeedRetry = <ResponseBody>({statusCode}: Response<ResponseBody>): boolean =>
  statusCode >= 400;

/**
 * Send a request to the (JSON) API by url, query params, HTTP method, headers,
 * post-data, timeout and number of retries.
 */
export const request = async <
  RequestBody = unknown,
  ResponseBody = unknown,
  RequestQuery extends Query = Query,
  RequestHeaders extends Headers = Headers,
>({
  isNeedRetry = defaultIsNeedRetry,
  headers,
  maxRetriesCount = 5,
  method = 'GET',
  query,
  requestBody = '',
  timeout = 30_000,
  url,
}: Options<RequestBody, ResponseBody, RequestQuery, RequestHeaders>): Promise<
  Response<ResponseBody>
> => {
  const urlObject = new URL(url);
  const logParams: LogParams<RequestBody, RequestQuery> = {
    headers,
    method,
    query,
    requestBody,
    retry: undefined,
    timeout,
    url,
  };

  if (urlObject.search !== '') {
    throw new E2EDError(
      `Url for request to ${url} contains search part: ${urlObject.search}.
Please, move search params to options property "query".`,
      logParams,
    );
  }

  urlObject.search = typeof query === 'string' ? query : stringify(query);

  const requestBodyAsString =
    typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody);
  const options = {
    headers: {
      'Content-Length': String(Buffer.byteLength(requestBodyAsString)),
      'Content-Type': 'application/json; charset=UTF-8',
      ...headers,
    },
    method,
  };
  const libRequest = wrapInTestRunTracker(
    urlObject.protocol === 'http:' ? httpRequest : httpsRequest,
  );

  (logParams as Mutable<typeof logParams>).headers = options.headers;

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    try {
      const {fullLogParams, response} = await oneTryOfRequest<
        RequestBody,
        ResponseBody,
        RequestQuery
      >({
        libRequest,
        logParams: {...logParams, retry},
        options,
        requestBodyAsString,
        timeout,
        urlObject,
      });
      const needRetry = isNeedRetry(response);

      await log(
        `Got a response to the request to ${url}`,
        {...fullLogParams, needRetry, response},
        LogEventType.InternalUtil,
      );

      if (needRetry === false) {
        return response;
      }
    } catch (cause) {
      await log(
        `An error was received during the request to ${url}`,
        {...logParams, cause, retry},
        LogEventType.InternalUtil,
      );
    }
  }

  throw new E2EDError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
