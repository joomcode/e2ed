import {LogEventStatus, LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

type ConsoleMessages = Awaited<ReturnType<typeof testController.getBrowserConsoleMessages>>;

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

    return testController.getBrowserConsoleMessages();
  }

  return testController.getBrowserConsoleMessages().then((messages) => {
    const logEventStatus =
      messages.error.length > 0 ? LogEventStatus.Failed : LogEventStatus.Passed;

    log('Got browser console messages', {logEventStatus, messages}, LogEventType.InternalAction);

    return messages;
  });
};
