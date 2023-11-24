import {LogEventStatus, LogEventType} from '../../constants/internal';

import {log} from './log';

import type {Payload, Response} from '../../types/internal';

/**
 * Logs backend response as error by log payload.
 * @internal
 */
export const logBackendResponseError = (response: Response, payload: Payload): void => {
  const {statusCode} = response;
  const {url} = response.request ?? {};
  const onUrl = url === undefined ? '' : ` on ${url}`;

  log(
    `Got a backend response (${statusCode}) with error${onUrl}`,
    {...payload, logEventStatus: LogEventStatus.Failed},
    LogEventType.InternalUtil,
  );
};
