import {getApiStatistics} from '../../context/apiStatistics';

import {getHeaderValue} from '../headers';

import {addApiStatistics} from './addApiStatistics';
import {getUrlTemplate} from './getUrlTemplate';

import type {ApiStatistics, RequestStatistics, ResponseWithRequest} from '../../types/internal';

/**
 * Adds single `ResponseWithRequest` to API statistics.
 * @internal
 */
export const addResponseToApiStatistics = (responseWithRequest: ResponseWithRequest): void => {
  const apiStatistics = getApiStatistics();
  const duration = responseWithRequest.completionTimeInMs - responseWithRequest.request.utcTimeInMs;
  const {
    request: {method, url},
    statusCode,
  } = responseWithRequest;

  const {hasExtension, urlTemplate} = getUrlTemplate(url);
  const isResource = hasExtension && method === 'GET';
  const size = Number(getHeaderValue(responseWithRequest.responseHeaders, 'content-length')) || 0;
  const requestStatistics: RequestStatistics = {[statusCode]: {count: 1, duration, size}};

  const additionalApiStatistics: ApiStatistics = isResource
    ? {pages: {}, requests: {}, resources: {[urlTemplate]: requestStatistics}}
    : {pages: {}, requests: {[urlTemplate]: {[method]: requestStatistics}}, resources: {}};

  addApiStatistics(apiStatistics, additionalApiStatistics);
};
