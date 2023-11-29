import {getFullPackConfig} from '../getFullPackConfig';

import {logBackendResponse} from './logBackendResponse';
import {logBackendResponseError} from './logBackendResponseError';

import type {ResponseWithRequest} from '../../types/internal';

/**
 * Maps backend response for logging.
 * @internal
 */
export const mapBackendResponseForLogs = (response: ResponseWithRequest): void => {
  const {mapBackendResponseErrorToLog, mapBackendResponseToLog} = getFullPackConfig();

  const errorPayload = mapBackendResponseErrorToLog(response);
  const payload = mapBackendResponseToLog(response);

  if (errorPayload !== undefined) {
    logBackendResponseError(response, errorPayload);
  }

  if (payload !== undefined) {
    logBackendResponse(payload);
  }
};
