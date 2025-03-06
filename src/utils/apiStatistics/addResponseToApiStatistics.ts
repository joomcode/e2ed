import {URL} from 'node:url';

import {getApiStatistics} from '../../context/apiStatistics';

import {getHeaderValue} from '../headers';

import {addApiStatistics} from './addApiStatistics';

import type {ApiStatistics, ResponseWithRequest, Url} from '../../types/internal';

/**
 * Add single `ResponseWithRequest` to API statistics.
 * @internal
 */
export const addResponseToApiStatistics = (responseWithRequest: ResponseWithRequest): void => {
  const apiStatistics = getApiStatistics();
  const duration = responseWithRequest.completionTimeInMs - responseWithRequest.request.utcTimeInMs;
  const {
    request: {method, url},
    statusCode,
  } = responseWithRequest;

  const size = Number(getHeaderValue(responseWithRequest.responseHeaders, 'content-length')) || 0;

  const {origin, pathname} = new URL(url);
  const urlWithoutQuery = `${origin}${pathname}` as Url;

  const additionalApiStatistics: ApiStatistics = {
    requests: {[urlWithoutQuery]: {[method]: {[statusCode]: {count: 1, duration, size}}}},
  };

  addApiStatistics(apiStatistics, additionalApiStatistics);
};
