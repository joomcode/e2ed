import {LogEventType} from '../../constants/internal';

import {getFullPackConfig} from '../config';

import {logWithPreparedOptions} from './logWithPreparedOptions';

import type {LogEvent, LogPayload, Mutable, Payload} from '../../types/internal';

const messageOfSingleResponse = 'Got a backend response to log';

/**
 * Adds single backend response to existing log event.
 * @internal
 */
export const addBackendResponseToLogEvent = (payload: Payload, logEvent: LogEvent): void => {
  logWithPreparedOptions(messageOfSingleResponse, {
    payload,
    type: LogEventType.InternalUtil,
  });

  const {mapLogPayloadInReport} = getFullPackConfig();

  const payloadInReport = mapLogPayloadInReport(
    messageOfSingleResponse,
    {backendResponses: [payload]},
    LogEventType.InternalUtil,
  );

  if (payloadInReport === 'skipLog' || payloadInReport === undefined) {
    return;
  }

  if (logEvent.payload === undefined) {
    // eslint-disable-next-line no-param-reassign
    (logEvent as Mutable<LogEvent>).payload = payloadInReport;

    return;
  }

  const backendResponsesFromPayload = payloadInReport.backendResponses;

  if (!(backendResponsesFromPayload instanceof Array)) {
    return;
  }

  const {backendResponses} = logEvent.payload;

  if (backendResponses === undefined) {
    // eslint-disable-next-line no-param-reassign
    (logEvent.payload as Mutable<LogPayload>).backendResponses = backendResponsesFromPayload;

    return;
  }

  const responseFromPayload = backendResponsesFromPayload[0];

  if (responseFromPayload === undefined) {
    return;
  }

  (backendResponses as Payload[]).push(responseFromPayload);
};
