import {LogEventStatus, LogEventType} from '../../constants/internal';
import {getFullMocksState} from '../../context/fullMocks';

import {writeResponseToFullMocks} from '../fullMocks';
import {log} from '../log';

import {oneTryOfRequest} from './oneTryOfRequest';

import type {Request, Response, ResponseWithRequest, Url} from '../../types/internal';

import type {OneTryOfRequestOptions} from './types';

type Options<SomeRequest extends Request, SomeResponse extends Response> = Readonly<{
  isNeedRetry: (
    response: ResponseWithRequest<SomeResponse, SomeRequest>,
  ) => Promise<boolean> | boolean;
  url: Url;
}> &
  OneTryOfRequestOptions;

/**
 * Get `ResponseWithRequest` from one try of request.
 * @internal
 */
export const getResponse = async <SomeRequest extends Request, SomeResponse extends Response>(
  options: Options<SomeRequest, SomeResponse>,
): Promise<ResponseWithRequest<SomeResponse, SomeRequest> | undefined> => {
  const {isNeedRetry, url, ...oneTryOfRequestOptions} = options;

  const {fullLogParams, response} = await oneTryOfRequest<SomeRequest, SomeResponse>(
    oneTryOfRequestOptions,
  );
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
    const fullMocksState = getFullMocksState();

    if (fullMocksState !== undefined) {
      writeResponseToFullMocks(response);
    }

    return response;
  }

  return undefined;
};
