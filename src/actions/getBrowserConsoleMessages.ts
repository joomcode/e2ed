import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

type ConsoleMessages = ReturnType<typeof testController.getBrowserConsoleMessages> extends Promise<
  infer T
>
  ? T
  : never;

/**
 * Returns an object that contains messages output to the browser console.
 */
export const getBrowserConsoleMessages = (): Promise<ConsoleMessages> => {
  log('Get browser console messages', LogEventType.InternalAction);

  return testController.getBrowserConsoleMessages();
};
