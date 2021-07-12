import {request as httpRequest} from 'http';
import {request as httpsRequest} from 'https';
import {stringify} from 'querystring';
import {URL} from 'url';

import {E2EUtilsError} from './E2EUtilsError';
import {getRandomId} from './getRandomId';
import {log} from './log';
import type {Headers, Method, Query} from '../types';
import {wrapInTestRunTracker} from './wrapInTestRunTracker';

type Options<Data> = Readonly<{
  url: string;
  query?: Query;
  method?: Method;
  headers?: Headers;
  data?: string | Record<string, unknown>;
  timeout?: number;
  maxRetriesCount?: number;
  isNeedRetry?: (response: Response<Data>) => boolean;
}>;

type Response<Data> = Readonly<{
  statusCode: number;
  headers: Headers;
  data: Data;
}>;

type LogParams = Readonly<{url: string}> & Record<string, unknown>;

type OneTryOfRequestOptions = Readonly<{
  urlObject: URL;
  options: Readonly<{method: Method; headers: Headers}>;
  dataAsString: string;
  libRequest: typeof httpRequest;
  timeout: number;
  logParams: LogParams;
}>;

const defaultIsNeedRetry = <Data>({statusCode}: Response<Data>) => statusCode >= 400;

const oneTryOfRequest = <Data>({
  urlObject,
  options,
  dataAsString,
  libRequest,
  timeout,
  logParams,
}: OneTryOfRequestOptions): Promise<{fullLogParams: LogParams; response: Response<Data>}> =>
  new Promise((resolve, reject) => {
    const fullOptions = {
      ...options,
      headers: {
        'X-Api-Token': getRandomId(),
        'X-Request-ID': getRandomId(),
        ...options.headers,
      },
    };
    const fullLogParams: LogParams = {...logParams, ...fullOptions};

    log(`Will be send a request to ${logParams.url}`, fullLogParams);

    let endTimeout: NodeJS.Timeout;

    const req = libRequest(urlObject, fullOptions, (res) => {
      res.on = wrapInTestRunTracker(res.on);

      endTimeout = setTimeout(() => {
        req.destroy();
        req.emit(
          'error',
          new E2EUtilsError(
            `The request to ${logParams.url} is timed out in ${timeout} ms`,
            fullLogParams,
          ),
        );
      }, timeout);

      res.setEncoding('utf8');

      const chunks: string[] = [];

      res.on('data', (chunk: string) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const responseDataAsString = chunks.join('');

        try {
          const responseData: Data = JSON.parse(responseDataAsString);
          const response = {
            statusCode: res.statusCode || 400,
            headers: res.headers,
            data: responseData,
          };

          clearTimeout(endTimeout);
          resolve({fullLogParams, response});
        } catch (cause) {
          clearTimeout(endTimeout);
          reject(
            new E2EUtilsError(
              `The response data string to request ${logParams.url} is not valid JSON: ${responseDataAsString}`,
              {...fullLogParams, cause},
            ),
          );
        }
      });
    });

    req.on = wrapInTestRunTracker(req.on);

    req.on('error', (cause) => {
      clearTimeout(endTimeout);
      reject(new E2EUtilsError(`Error on request to ${logParams.url}`, {...fullLogParams, cause}));
    });

    req.write(dataAsString);
    req.end();
  });

/**
 * Send a request to the (JSON) API by url, query params, HTTP-method, headers,
 * post-data, timeout and number of retry attempts.
 */
export const request = async <Data = unknown>({
  url,
  query,
  method = 'GET',
  headers,
  data = '',
  timeout = 30_000,
  maxRetriesCount = 5,
  isNeedRetry = defaultIsNeedRetry,
}: Options<Data>): Promise<Response<Data>> => {
  const urlObject = new URL(url);
  const logParams: LogParams = {url, query, method, headers, data, timeout};

  if (urlObject.search !== '') {
    throw new E2EUtilsError(
      `Url for request to ${url} contains search part: ${urlObject.search}`,
      logParams,
    );
  }

  urlObject.search = stringify(query);

  const dataAsString = typeof data === 'string' ? data : JSON.stringify(data);
  const options = {
    method,
    headers: {
      'Content-Length': String(Buffer.byteLength(dataAsString)),
      'Content-Type': 'application/json; charset=UTF-8',
      ...headers,
    },
  };
  const libRequest = wrapInTestRunTracker(
    urlObject.protocol === 'http:' ? httpRequest : httpsRequest,
  );

  logParams.headers = options.headers;

  for (let retryIndex = 1; retryIndex <= maxRetriesCount; retryIndex += 1) {
    const retry = `${retryIndex}/${maxRetriesCount}`;

    try {
      // eslint-disable-next-line no-await-in-loop
      const {fullLogParams, response} = await oneTryOfRequest<Data>({
        urlObject,
        options,
        dataAsString,
        libRequest,
        timeout,
        logParams: {...logParams, retry},
      });
      const needRetry = isNeedRetry(response);

      log(`Got a response to the request to ${url}`, {...fullLogParams, needRetry, response});

      if (needRetry === false) {
        return response;
      }
    } catch (cause) {
      log(`An error was received during the request to ${url}`, {...logParams, retry, cause});
    }
  }

  throw new E2EUtilsError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
