import {getDurationWithUnits} from 'e2ed/utils';

import type {MapBackendResponseToLog} from 'autotests/types/packSpecific';

/**
 * Maps responses from the backend to logs during the test.
 * Backend responses received during a certain test step are accumulated
 * in an array in the `backendResponses` field of the log of this step.
 * Log the `responseBody` field carefully, as the body of backend response can be very large.
 * If the function returns `undefined`, the response is not logged (skipped).
 */
export const mapBackendResponseToLog: MapBackendResponseToLog = ({
  completionTimeInMs,
  request,
  statusCode,
}) => {
  if (statusCode >= 400) {
    return undefined;
  }

  const duration = getDurationWithUnits(completionTimeInMs - request.utcTimeInMs);

  return {duration, statusCode, url: request?.url};
};
