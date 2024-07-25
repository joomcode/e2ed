import {LogEventStatus, LogEventType} from '../constants/internal';
import {log} from '../utils/log';

type ConsoleMessages = Readonly<{
  error: readonly string[];
  info: readonly string[];
  log: readonly string[];
  warn: readonly string[];
}>;

type Options = Readonly<{
  showMessagesInLog?: boolean;
}>;

/**
 * Returns an object that contains messages output to the browser console.
 */
export const getBrowserConsoleMessages = (options: Options = {}): Promise<ConsoleMessages> => {
  const {showMessagesInLog = false} = options;

  if (showMessagesInLog === false) {
    log('Get browser console messages', LogEventType.InternalAction);

    // TODO
    return Promise.resolve({error: [], info: [], log: [], warn: []});
  }

  return Promise.resolve({error: [], info: [], log: [], warn: []}).then((messages) => {
    const logEventStatus =
      messages.error.length > 0 ? LogEventStatus.Failed : LogEventStatus.Passed;

    log('Got browser console messages', {logEventStatus, messages}, LogEventType.InternalAction);

    return messages;
  });
};
