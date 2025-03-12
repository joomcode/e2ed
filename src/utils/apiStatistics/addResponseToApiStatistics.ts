import {getApiStatistics} from '../../context/apiStatistics';

import {getHeaderValue} from '../headers';

import {addApiStatistics} from './addApiStatistics';
import {getUrlTemplate} from './getUrlTemplate';

import type {ApiStatistics, ResponseWithRequest} from '../../types/internal';

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
  const urlTemplate = getUrlTemplate(url);

  const additionalApiStatistics: ApiStatistics = {
    pages: {},
    requests: {[urlTemplate]: {[method]: {[statusCode]: {count: 1, duration, size}}}},
  };

  addApiStatistics(apiStatistics, additionalApiStatistics);
};
