import {LogEventStatus, LogEventType} from '../constants/internal';
import {getConsoleMessagesFromContext} from '../context/consoleMessages';
import {log} from '../utils/log';

import type {ConsoleMessage} from '../types/internal';

type Options = Readonly<{showMessagesInLog?: boolean; skipLogs?: boolean}>;

const logMessage = 'Get browser console messages';

/**
 * Returns an object that contains messages output to the browser console.
 */
export const getBrowserConsoleMessages = (options: Options = {}): readonly ConsoleMessage[] => {
  const {skipLogs = false, showMessagesInLog = false} = options;
  const consoleMessages = getConsoleMessagesFromContext();

  if (skipLogs) {
    return consoleMessages;
  }

  if (showMessagesInLog === false) {
    log(logMessage, LogEventType.InternalAction);
  } else {
    const logEventStatus = consoleMessages.some(({type}) => type === 'error')
      ? LogEventStatus.Failed
      : LogEventStatus.Passed;

    log(logMessage, {consoleMessages, logEventStatus}, LogEventType.InternalAction);
  }

  return consoleMessages;
};
