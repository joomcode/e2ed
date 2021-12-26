import {request as httpRequest} from 'http';
import {request as httpsRequest} from 'https';
import {stringify} from 'querystring';
import {URL} from 'url';

import {LogEventType} from '../../constants/internal';

import {E2EDError} from '../E2EDError';
import {log} from '../log';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import {oneTryOfRequest} from './oneTryOfRequest';

import type {Headers as AnyHeaders, Query as AnyQuery} from '../../types/internal';

import type {LogParams, Options, Response} from './types';

const defaultIsNeedRetry = <Output>({statusCode}: Response<Output>): boolean => statusCode >= 400;

/**
 * Send a request to the (JSON) API by url, query params, HTTP-method, headers,
 * post-data, timeout and number of retries.
 */
export const request = async <
  Input = unknown,
  Output = unknown,
  Query extends AnyQuery = AnyQuery,
  Headers extends AnyHeaders = AnyHeaders,
>({
  url,
  query,
  method = 'GET',
  headers,
  input = '',
  timeout = 30_000,
  maxRetriesCount = 5,
  isNeedRetry = defaultIsNeedRetry,
}: Options<Input, Output, Query, Headers>): Promise<Response<Output>> => {
  const urlObject = new URL(url);
  const logParams: LogParams = {headers, input, method, query, timeout, url};

  if (urlObject.search !== '') {
    throw new E2EDError(
      `Url for request to ${url} contains search part: ${urlObject.search}.
Please, move search params to options property "query".`,
      logParams,
    );
  }

  urlObject.search = stringify(query);

  const inputAsString = typeof input === 'string' ? input : JSON.stringify(input);
  const options = {
    headers: {
      'Content-Length': String(Buffer.byteLength(inputAsString)),
      'Content-Type': 'application/json; charset=UTF-8',
      ...headers,
    },
    method,
  };
  const libRequest = wrapInTestRunTracker(
    urlObject.protocol === 'http:' ? httpRequest : httpsRequest,
  );

  logParams.headers = options.headers;

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    try {
      const {fullLogParams, response} = await oneTryOfRequest<Output>({
        inputAsString,
        libRequest,
        logParams: {...logParams, retry},
        options,
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
