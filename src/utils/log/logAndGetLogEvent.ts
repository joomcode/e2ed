import {LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {getFullPackConfig} from '../config';
// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from '../events/registerLogEvent';

import {logWithPreparedOptions} from './logWithPreparedOptions';

import type {Log, LogEvent, LogPayload, UtcTimeInMs} from '../../types/internal';

/**
 * Logs message with payload and get log event.
 * @internal
 */
export const logAndGetLogEvent: Log<LogEvent | undefined> = (
  message,
  maybePayload?: unknown,
  maybeLogEventType?: unknown,
) => {
  const time = Date.now() as UtcTimeInMs;
  const runId = getRunId();
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : ((maybeLogEventType as LogEventType) ?? LogEventType.Unspecified);

  const {addLogsWithTags, mapLogPayloadInReport} = getFullPackConfig();

  if (payload && 'logTag' in payload && !addLogsWithTags.includes(payload.logTag)) {
    return;
  }

  const payloadInReport = mapLogPayloadInReport(message, payload, type);

  const maybeLogEvent = registerLogEvent(runId, {
    children: undefined,
    endTime: undefined,
    message,
    payload: payloadInReport,
    time,
    type,
  });

  logWithPreparedOptions(message, {payload, runId, type, utcTimeInMs: time});

  return maybeLogEvent;
};
