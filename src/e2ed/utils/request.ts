import {request as httpRequest} from 'http';
import {request as httpsRequest} from 'https';
import {stringify} from 'querystring';
import {URL} from 'url';

import {E2EDError} from './E2EDError';
import {getRandomId} from './getRandomId';
import {log} from './log';
import {wrapInTestRunTracker} from './wrapInTestRunTracker';

import type {Headers, Method, Query} from '../types';

type Response<Output> = Readonly<{
  statusCode: number;
  headers: Headers;
  output: Output;
}>;

type Options<Input, Output> = Readonly<{
  url: string;
  query?: Query;
  method?: Method;
  headers?: Headers;
  input?: string | Input;
  timeout?: number;
  maxRetriesCount?: number;
  isNeedRetry?: (response: Response<Output>) => boolean;
}>;

type LogParams = Readonly<{url: string}> & Record<string, unknown>;

type OneTryOfRequestOptions = Readonly<{
  urlObject: URL;
  options: Readonly<{method: Method; headers: Headers}>;
  inputAsString: string;
  libRequest: typeof httpRequest;
  timeout: number;
  logParams: LogParams;
}>;

const defaultIsNeedRetry = <Output>({statusCode}: Response<Output>) => statusCode >= 400;

const oneTryOfRequest = <Output>({
  urlObject,
  options,
  inputAsString,
  libRequest,
  timeout,
  logParams,
}: OneTryOfRequestOptions): Promise<{fullLogParams: LogParams; response: Response<Output>}> =>
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
      // eslint-disable-next-line @typescript-eslint/unbound-method
      res.on = wrapInTestRunTracker(res.on);

      endTimeout = setTimeout(() => {
        req.destroy();
        req.emit(
          'error',
          new E2EDError(
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
        const outputAsString = chunks.join('');

        try {
          const output = JSON.parse(outputAsString) as Output;
          const response = {
            statusCode: res.statusCode || 400,
            headers: res.headers,
            output,
          };

          clearTimeout(endTimeout);
          resolve({fullLogParams, response});
        } catch (cause: unknown) {
          clearTimeout(endTimeout);
          reject(
            new E2EDError(
              `The response data string to request ${logParams.url} is not valid JSON: ${outputAsString}`,
              {...fullLogParams, cause},
            ),
          );
        }
      });
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    req.on = wrapInTestRunTracker(req.on);

    req.on('error', (cause) => {
      clearTimeout(endTimeout);
      reject(new E2EDError(`Error on request to ${logParams.url}`, {...fullLogParams, cause}));
    });

    req.write(inputAsString);
    req.end();
  });

/**
 * Send a request to the (JSON) API by url, query params, HTTP-method, headers,
 * post-data, timeout and number of retry attempts.
 */
export const request = async <Input = unknown, Output = unknown>({
  url,
  query,
  method = 'GET',
  headers,
  input = '',
  timeout = 30_000,
  maxRetriesCount = 5,
  isNeedRetry = defaultIsNeedRetry,
}: Options<Input, Output>): Promise<Response<Output>> => {
  const urlObject = new URL(url);
  const logParams: LogParams = {url, query, method, headers, input, timeout};

  if (urlObject.search !== '') {
    throw new E2EDError(
      `Url for request to ${url} contains search part: ${urlObject.search}`,
      logParams,
    );
  }

  urlObject.search = stringify(query);

  const inputAsString = typeof input === 'string' ? input : JSON.stringify(input);
  const options = {
    method,
    headers: {
      'Content-Length': String(Buffer.byteLength(inputAsString)),
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
      const {fullLogParams, response} = await oneTryOfRequest<Output>({
        urlObject,
        options,
        inputAsString,
        libRequest,
        timeout,
        logParams: {...logParams, retry},
      });
      const needRetry = isNeedRetry(response);

      log(`Got a response to the request to ${url}`, {...fullLogParams, needRetry, response});

      if (needRetry === false) {
        return response;
      }
    } catch (cause: unknown) {
      log(`An error was received during the request to ${url}`, {...logParams, retry, cause});
    }
  }

  throw new E2EDError(
    `All ${maxRetriesCount} retries to request to ${url} have been exhausted`,
    logParams,
  );
};
