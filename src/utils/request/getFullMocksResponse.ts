import {assertValueIsDefined, assertValueIsNotNull} from '../asserts';
import {getFullPackConfig} from '../config';
import {getResponseFromFullMocks} from '../fullMocks';

import {getQuery} from './getQuery';

import type {URL} from 'node:url';

import type {
  FullMocksState,
  RequestWithUtcTimeInMs,
  ResponseWithRequest,
  UtcTimeInMs,
} from '../../types/internal';

import type {LogParams} from './types';

/**
 * Get mocked response in "full mocks" mode.
 * @internal
 */
export const getFullMocksResponse = (
  fullMocksState: FullMocksState,
  logParams: LogParams,
  urlObject: URL,
): ResponseWithRequest => {
  const {fullMocks: fullMocksConfig} = getFullPackConfig();

  assertValueIsNotNull(fullMocksConfig, 'fullMocksConfig is not null', logParams);

  const {method, requestBody, requestHeaders, url} = logParams;

  assertValueIsDefined(requestHeaders, 'requestHeaders is defined', logParams);

  const requestKind = fullMocksConfig.getRequestKind(urlObject);

  const requestWithUtcTimeInMs: RequestWithUtcTimeInMs = {
    method,
    query: getQuery(urlObject.search),
    requestBody,
    requestHeaders,
    url,
    utcTimeInMs: Date.now() as UtcTimeInMs,
  };

  const response: ResponseWithRequest = {
    completionTimeInMs: requestWithUtcTimeInMs.utcTimeInMs,
    duration: '0ms',
    request: requestWithUtcTimeInMs,
    ...getResponseFromFullMocks({fullMocksState, requestKind, urlObject}, requestWithUtcTimeInMs),
  };

  return response;
};
