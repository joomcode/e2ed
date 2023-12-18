import {getFullPackConfig} from '../getFullPackConfig';

import {logBackendResponse} from './logBackendResponse';
import {logBackendResponseError} from './logBackendResponseError';

import type {ResponseWithRequest} from '../../types/internal';

/**
 * Maps backend response for logging.
 * @internal
 */
export const mapBackendResponseForLogs = (responseWithRequest: ResponseWithRequest): void => {
  const {mapBackendResponseErrorToLog, mapBackendResponseToLog} = getFullPackConfig();

  const errorPayload = mapBackendResponseErrorToLog(responseWithRequest);
  const payload = mapBackendResponseToLog(responseWithRequest);

  if (errorPayload !== undefined) {
    logBackendResponseError(responseWithRequest, errorPayload);
  }

  if (payload !== undefined) {
    logBackendResponse(payload);
  }
};
