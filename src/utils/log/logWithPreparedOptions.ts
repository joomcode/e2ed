import {getRunId} from '../../context/runId';

import {generalLog} from '../generalLog';
import {getUserlandHooks} from '../userlandHooks';

import type {LogEventType} from '../../constants/internal';
import type {LogPayload, RunId, UtcTimeInMs} from '../../types/internal';

type Options = Readonly<{
  payload: LogPayload | undefined;
  runId?: RunId;
  type: LogEventType;
  utcTimeInMs?: UtcTimeInMs;
}>;

/**
 * Logs (with prepared options) message with optional payload to console and to log file.
 * @internal
 */
export const logWithPreparedOptions = (
  message: string,
  {payload, runId = getRunId(), type, utcTimeInMs = Date.now() as UtcTimeInMs}: Options,
): void => {
  const {getLogContext} = getUserlandHooks();
  const context = getLogContext(message, payload, type);

  generalLog(message, payload, {context, prefixEnding: `[${runId}]`, type, utcTimeInMs});
};
