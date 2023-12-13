import {LogEventStatus, LogEventType} from '../../constants/internal';

import {log} from './log';

import type {Payload, ResponseWithRequest} from '../../types/internal';

/**
 * Logs backend response as error by log payload.
 * @internal
 */
export const logBackendResponseError = (
  {request: {url}, statusCode}: ResponseWithRequest,
  payload: Payload,
): void => {
  log(
    `Got a backend response (${statusCode}) with error on ${url}`,
    {...payload, logEventStatus: LogEventStatus.Failed},
    LogEventType.InternalUtil,
  );
};
