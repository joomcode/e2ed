import {getDurationWithUnits} from 'e2ed/utils';

import type {MapBackendResponseErrorToLog} from 'autotests/types/packSpecific';

/**
 * Maps responses with errors from the backend to "red" logs (as errors) during the test.
 * It is assumed that the function will select responses with
 * statuse codes of 400 and higher (client and server errors).
 * Backend responses with errors are accumulated in separate "red" log step
 * (with `logEventStatus: 'failed'`).
 * Log the `responseBody` field carefully, as the body of backend response can be very large.
 * If the function returns `undefined`, the response is not logged (skipped).
 */
export const mapBackendResponseErrorToLog: MapBackendResponseErrorToLog = ({
  completionTimeInMs,
  request,
  responseBody,
  responseHeaders,
  statusCode,
}) => {
  if (statusCode < 400) {
    return undefined;
  }

  const {requestBody, utcTimeInMs, ...requestWithoutBody} = request;

  const duration = getDurationWithUnits(completionTimeInMs - utcTimeInMs);

  return {
    duration,
    request: {
      requestBody: requestBody instanceof Buffer ? String(requestBody) : requestBody,
      ...requestWithoutBody,
    },
    responseBody: responseBody instanceof Buffer ? String(responseBody) : responseBody,
    responseHeaders,
  };
};
