import {LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {getFullPackConfig} from '../config';
// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from '../events/registerLogEvent';

import {logWithPreparedOptions} from './logWithPreparedOptions';

import type {Log, LogPayload, UtcTimeInMs} from '../../types/internal';

/**
 * Logs every actions and API requests in e2ed tests.
 */
export const log: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  const time = Date.now() as UtcTimeInMs;
  const runId = getRunId();
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : ((maybeLogEventType as LogEventType) ?? LogEventType.Unspecified);

  const {mapLogPayloadInReport} = getFullPackConfig();
  const payloadInReport = mapLogPayloadInReport(message, payload, type);

  registerLogEvent(runId, {message, payload: payloadInReport, time, type});

  logWithPreparedOptions(message, {payload, runId, type, utcTimeInMs: time});
};
