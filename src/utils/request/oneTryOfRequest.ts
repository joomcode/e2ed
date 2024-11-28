import {BAD_REQUEST_STATUS_CODE, LogEventType} from '../../constants/internal';
import {getRandomId} from '../../generators/internal';

import {cloneWithoutUndefinedProperties} from '../clone';
import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {log} from '../log';
import {parseMaybeEmptyValueAsJson} from '../parse';

import {getQuery} from './getQuery';

import type {
  Request,
  RequestWithUtcTimeInMs,
  Response,
  ResponseWithRequest,
  Url,
  UtcTimeInMs,
} from '../../types/internal';

import type {LogParams, OneTryOfRequestOptions} from './types';

/**
 * One try of request.
 * @internal
 */
export const oneTryOfRequest = <SomeRequest extends Request, SomeResponse extends Response>({
  isResponseBodyInJsonFormat,
  libRequest,
  logParams,
  options,
  requestBody,
  requestBodyAsString,
  timeout,
  urlObject,
}: OneTryOfRequestOptions): Promise<{
  fullLogParams: LogParams;
  response: ResponseWithRequest<SomeResponse, SomeRequest>;
}> =>
  new Promise((resolve, reject) => {
    const fullOptions = {
      ...options,
      requestHeaders: cloneWithoutUndefinedProperties({
        'x-e2ed-request-id': getRandomId(),
        ...options.requestHeaders,
      }),
    };
    const fullLogParams: LogParams = {...logParams, ...fullOptions};
    const {requestHeaders, ...fullOptionsWithoutHeaders} = fullOptions;
    const fullOptionsWithHeaders = {...fullOptionsWithoutHeaders, headers: requestHeaders};

    log(`Will be send a request to ${logParams.url}`, fullLogParams, LogEventType.InternalUtil);

    let endTimeout: NodeJS.Timeout;

    const utcTimeInMs = Date.now() as UtcTimeInMs;

    const req = libRequest(urlObject, fullOptionsWithHeaders, (res) => {
      res.setEncoding('utf8');

      const chunks: string[] = [];

      res.on('data', (chunk: string) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const completionTimeInMs = Date.now() as UtcTimeInMs;

        const responseBodyAsString = chunks.join('');
        const statusCode = (res.statusCode ??
          BAD_REQUEST_STATUS_CODE) as SomeResponse['statusCode'];

        try {
          const responseBody: SomeResponse['responseBody'] = isResponseBodyInJsonFormat
            ? parseMaybeEmptyValueAsJson(responseBodyAsString)
            : responseBodyAsString;

          const url = (res.url !== undefined && res.url !== '' ? res.url : urlObject.href) as Url;

          const request = {
            method: options.method,
            query: getQuery(urlObject.search),
            requestBody,
            requestHeaders,
            url,
            utcTimeInMs,
          } satisfies RequestWithUtcTimeInMs as unknown as RequestWithUtcTimeInMs<SomeRequest>;

          const duration = getDurationWithUnits(completionTimeInMs - request.utcTimeInMs);

          const response = {
            completionTimeInMs,
            duration,
            request,
            responseBody,
            responseHeaders: res.headers as SomeResponse['responseHeaders'],
            statusCode,
          } satisfies ResponseWithRequest as unknown as ResponseWithRequest<
            SomeResponse,
            SomeRequest
          >;

          clearTimeout(endTimeout);
          resolve({fullLogParams, response});
        } catch (cause) {
          clearTimeout(endTimeout);
          reject(
            new E2edError(
              `The response data string to request ${logParams.url} is not valid JSON: ${responseBodyAsString}`,
              {...fullLogParams, cause, statusCode},
            ),
          );
        }
      });
    });

    endTimeout = setTimeout(() => {
      const timeoutWithUnits = getDurationWithUnits(timeout);

      req.destroy();
      req.emit(
        'error',
        new E2edError(`The request to ${logParams.url} is timed out in ${timeoutWithUnits}`, {
          ...fullLogParams,
          cause: undefined,
        }),
      );
    }, timeout);

    req.on('error', (cause) => {
      clearTimeout(endTimeout);
      reject(new E2edError(`Error on request to ${logParams.url}`, {...fullLogParams, cause}));
    });

    req.write(requestBodyAsString);
    req.end();
  });
