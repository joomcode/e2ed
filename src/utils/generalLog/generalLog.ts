import {CONSOLE_INSPECT_OPTIONS} from '../../constants/internal';

import {getFullPackConfig} from '../getFullPackConfig';
import {valueToString} from '../valueToString';

import {getLogPrefix} from './getLogPrefix';
import {addLogToLogFile} from './logFile';

import type {LogContext, LogPayload, UtcTimeInMs} from '../../types/internal';

type TestLogParams = Readonly<{
  context: LogContext | undefined;
  prefixEnding: string;
  utcTimeInMs: UtcTimeInMs;
}>;

/**
 * General (out of test context) log to stdout.
 * @internal
 */
// eslint-disable-next-line complexity
export const generalLog = (
  message: string,
  payload?: LogPayload,
  testLogParams?: TestLogParams,
): void => {
  const {printLogsInConsole, logFileName} = getFullPackConfig();

  if (!printLogsInConsole && !logFileName) {
    return;
  }

  const context = testLogParams?.context;
  const logPrefix = testLogParams
    ? getLogPrefix(testLogParams.prefixEnding, testLogParams.utcTimeInMs)
    : getLogPrefix();
  const logMessageHead = `${logPrefix} ${message}`;
  const printedValue =
    context && payload && !('context' in payload) ? {...payload, context} : payload;

  if (printLogsInConsole) {
    const printedString =
      payload === undefined ? '' : ` ${valueToString(printedValue, CONSOLE_INSPECT_OPTIONS)}`;

    // eslint-disable-next-line no-console
    console.log(`${logMessageHead}${printedString}\n`);
  }

  if (logFileName) {
    const printedString = payload === undefined ? '' : ` ${valueToString(printedValue)}`;

    addLogToLogFile(`${logMessageHead}${printedString}\n`);
  }
};
