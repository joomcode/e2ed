import {BAD_REQUEST_STATUS_CODE, LogEventType} from '../../constants/internal';

import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';
import {E2EDError} from '../E2EDError';
import {getRandomId} from '../getRandomId';
import {log} from '../log';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import type {Response, StatusCode} from '../../types/internal';

import type {LogParams, OneTryOfRequestOptions} from './types';

/**
 * One try of request.
 * @internal
 */
export const oneTryOfRequest = <SomeResponse extends Response>({
  urlObject,
  options,
  requestBodyAsString,
  libRequest,
  timeout,
  logParams,
}: OneTryOfRequestOptions): Promise<{
  fullLogParams: LogParams;
  response: SomeResponse;
}> =>
  new Promise((resolve, reject) => {
    const fullOptions = {
      ...options,
      requestHeaders: cloneWithoutUndefinedProperties({
        'X-Request-ID': getRandomId(),
        ...options.requestHeaders,
      }),
    };
    const fullLogParams: LogParams = {...logParams, ...fullOptions};

    void log(
      `Will be send a request to ${logParams.url}`,
      fullLogParams,
      LogEventType.InternalUtil,
    ).then(() => {
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
          const responseBodyAsString = chunks.join('');
          const statusCode = (res.statusCode as StatusCode) || BAD_REQUEST_STATUS_CODE;

          try {
            const responseBody = (
              responseBodyAsString === '' ? undefined : JSON.parse(responseBodyAsString)
            ) as SomeResponse['responseBody'];
            const response = {
              responseBody,
              responseHeaders: res.headers,
              statusCode,
            } as SomeResponse;

            clearTimeout(endTimeout);
            resolve({fullLogParams, response});
          } catch (cause) {
            clearTimeout(endTimeout);
            reject(
              new E2EDError(
                `The response data string to request ${logParams.url} is not valid JSON: ${responseBodyAsString}`,
                {...fullLogParams, cause, statusCode},
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

      req.write(requestBodyAsString);
      req.end();
    });
  });
