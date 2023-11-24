import {LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {getTestRunEvent} from '../events';

import {log} from './log';

import type {Mutable, Payload} from '../../types/internal';

/**
 * Logs backend response to last log event.
 * @internal
 */
export const logBackendResponse = (payload: Payload): void => {
  const runId = getRunId();
  const {logEvents} = getTestRunEvent(runId);

  const lastLogEvent = logEvents[logEvents.length - 1];

  if (lastLogEvent !== undefined) {
    if (lastLogEvent.payload === undefined) {
      (lastLogEvent as Mutable<typeof lastLogEvent>).payload = {backendResponses: [payload]};

      return;
    }

    const {backendResponses} = lastLogEvent.payload;

    if (backendResponses === undefined) {
      (lastLogEvent.payload as Mutable<typeof lastLogEvent.payload>).backendResponses = [payload];

      return;
    }

    (backendResponses as Payload[]).push(payload);

    return;
  }

  log('Got a backend responses to log', {backendResponses: [payload]}, LogEventType.InternalUtil);
};
