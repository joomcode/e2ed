import {getFullPackConfig} from '../config';

import {getLogMessageBody} from './getLogMessageBody';
import {getLogPrefix} from './getLogPrefix';
import {addLogToLogFile} from './logFile';
import {removeStyleFromString} from './removeStyleFromString';

import type {LogEventType} from '../../constants/internal';
import type {LogContext, LogPayload, UtcTimeInMs} from '../../types/internal';

type TestLogParams = Readonly<{
  context: LogContext | undefined;
  prefixEnding: string;
  type: LogEventType;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * Logs general (out of test context) message with optional payload to console and to log file.
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

  if (logFileName) {
    const messageWithoutStyle = removeStyleFromString(message);
    const payloadInLogFile = mapLogPayloadInLogFile(
      messageWithoutStyle,
      payload,
      testLogParams?.type,
    );

    if (payloadInLogFile !== 'skipLog') {
      const logMessageBody = getLogMessageBody(context, false, payloadInLogFile);

      addLogToLogFile(`${logPrefix} ${messageWithoutStyle}${logMessageBody}\n`);
    }
  }

  const payloadInConsole = mapLogPayloadInConsole(message, payload, testLogParams?.type);

  if (payloadInConsole === 'skipLog') {
    return;
  }

  const logMessageBody = getLogMessageBody(context, true, payloadInConsole);

  // eslint-disable-next-line no-console
  console.log(`${logPrefix} ${message}${logMessageBody}\n`);
};
