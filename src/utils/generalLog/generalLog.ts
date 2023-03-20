import {getFullPackConfig} from '../getFullPackConfig';

import {getLogMessageBody} from './getLogMessageBody';
import {getLogPrefix} from './getLogPrefix';
import {addLogToLogFile} from './logFile';

import type {LogEventType} from '../../constants/internal';
import type {LogContext, LogPayload, UtcTimeInMs} from '../../types/internal';

type TestLogParams = Readonly<{
  context: LogContext | undefined;
  prefixEnding: string;
  type: LogEventType;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * General (out of test context) log to stdout.
 * @internal
 */
export const generalLog = (
  message: string,
  payload?: LogPayload,
  testLogParams?: TestLogParams,
): void => {
  const {logFileName, mapLogPayloadInConsole, mapLogPayloadInLogFile} = getFullPackConfig();

  const context = testLogParams?.context;
  const logPrefix = testLogParams
    ? getLogPrefix(testLogParams.prefixEnding, testLogParams.utcTimeInMs)
    : getLogPrefix();
  const logMessageHead = `${logPrefix} ${message}`;

  if (logFileName) {
    const payloadInLogFile = mapLogPayloadInLogFile(message, payload, testLogParams?.type);

    if (payloadInLogFile !== null) {
      const logMessageBody = getLogMessageBody(context, false, payloadInLogFile);

      addLogToLogFile(`${logMessageHead}${logMessageBody}\n`);
    }
  }

  const payloadInConsole = mapLogPayloadInConsole(message, payload, testLogParams?.type);

  if (payloadInConsole === null) {
    return;
  }

  const logMessageBody = getLogMessageBody(context, true, payloadInConsole);

  // eslint-disable-next-line no-console
  console.log(`${logMessageHead}${logMessageBody}\n`);
};
