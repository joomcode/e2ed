import {LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {getTestRunEvent} from '../events';
import {getFullPackConfig} from '../getFullPackConfig';

import {log} from './log';
import {logWithPreparedOptions} from './logWithPreparedOptions';

import type {Mutable, Payload} from '../../types/internal';

const messageOfSingleResponse = 'Got a backend response to log';

/**
 * Logs backend response to last log event.
 * @internal
 */
export const logBackendResponse = (payload: Payload): void => {
  const runId = getRunId();
  const {logEvents} = getTestRunEvent(runId);

  const lastLogEvent = logEvents[logEvents.length - 1];

  if (lastLogEvent !== undefined) {
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

    if (lastLogEvent.payload === undefined) {
      (lastLogEvent as Mutable<typeof lastLogEvent>).payload = payloadInReport;

      return;
    }

    const backendResponsesFromPayload = payloadInReport.backendResponses;

    if (!(backendResponsesFromPayload instanceof Array)) {
      return;
    }

    const {backendResponses} = lastLogEvent.payload;

    if (backendResponses === undefined) {
      (lastLogEvent.payload as Mutable<typeof lastLogEvent.payload>).backendResponses =
        backendResponsesFromPayload;

      return;
    }

    const responseFromPayload = backendResponsesFromPayload[0];

    if (responseFromPayload === undefined) {
      return;
    }

    (backendResponses as Payload[]).push(responseFromPayload);

    return;
  }

  log('Got a backend responses to log', {backendResponses: [payload]}, LogEventType.InternalUtil);
};
