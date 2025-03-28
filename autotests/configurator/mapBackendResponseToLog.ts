import {BAD_REQUEST_STATUS_CODE} from 'e2ed/constants';

import type {MapBackendResponseToLog} from 'autotests/configurator';

/**
 * Maps responses from the backend to logs during the test.
 * Backend responses received during a certain test step are accumulated
 * in an array in the `backendResponses` field of the log of this step.
 * Log the `responseBody` field carefully, as the body of backend response can be very large.
 * If the function returns `undefined`, the response is not logged (skipped).
 */
export const mapBackendResponseToLog: MapBackendResponseToLog = ({
  duration,
  request,
  statusCode,
}) => {
  if (statusCode >= BAD_REQUEST_STATUS_CODE) {
    return undefined;
  }

  const {url} = request;

  if (
    url.startsWith('https://r.bing.com/rp/') ||
    url.startsWith('https://www.bing.com/fd/') ||
    url.includes('&key=')
  ) {
    return undefined;
  }

  return {duration, statusCode, url};
};
