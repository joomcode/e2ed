import {BAD_REQUEST_STATUS_CODE, LogEventType} from '../../constants/internal';

import {cloneWithoutUndefinedProperties} from '../cloneWithoutUndefinedProperties';
import {E2EDError} from '../E2EDError';
import {getRandomId} from '../getRandomId';
import {log} from '../log';
import {wrapInTestRunTracker} from '../wrapInTestRunTracker';

import type {DeepReadonly} from '../../types/internal';

import type {LogParams, OneTryOfRequestOptions, Response} from './types';

/**
 * One try of request.
 * @internal
 */
export const oneTryOfRequest = <Output>({
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
      headers: cloneWithoutUndefinedProperties({
        'X-Request-ID': getRandomId(),
        ...options.headers,
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
          const outputAsString = chunks.join('');
          const statusCode = res.statusCode || BAD_REQUEST_STATUS_CODE;

          try {
            const output = (
              outputAsString === '' ? undefined : JSON.parse(outputAsString)
            ) as DeepReadonly<Output>;
            const response = {
              headers: res.headers,
              output,
              statusCode,
            };

            clearTimeout(endTimeout);
            resolve({fullLogParams, response});
          } catch (cause) {
            clearTimeout(endTimeout);
            reject(
              new E2EDError(
                `The response data string to request ${logParams.url} is not valid JSON: ${outputAsString}`,
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

      req.write(inputAsString);
      req.end();
    });
  });
