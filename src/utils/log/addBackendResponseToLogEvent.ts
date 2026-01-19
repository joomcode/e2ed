import {LogEventType} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {setReadonlyProperty} from '../object';

import {getBackendResponsesLogEvent} from './getBackendResponsesLogEvent';
import {logWithPreparedOptions} from './logWithPreparedOptions';

import type {LogEvent, Mutable, Payload} from '../../types/internal';

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

  const backendResponsesLogEvent = getBackendResponsesLogEvent(logEvent);

  if (backendResponsesLogEvent.payload === undefined) {
    setReadonlyProperty(backendResponsesLogEvent, 'payload', payloadInReport);

    return;
  }

  const backendResponsesFromPayload = payloadInReport.backendResponses;

  if (!(backendResponsesFromPayload instanceof Array)) {
    return;
  }

  const {backendResponses} = backendResponsesLogEvent.payload;

  if (backendResponses === undefined) {
    setReadonlyProperty(
      backendResponsesLogEvent.payload,
      'backendResponses',
      backendResponsesFromPayload,
    );

    return;
  }

  const responseFromPayload = backendResponsesFromPayload[0];

  if (responseFromPayload === undefined) {
    return;
  }

  (backendResponses as Mutable<typeof backendResponses>).push(responseFromPayload);
};
