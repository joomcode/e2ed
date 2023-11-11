import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

import type {UnwrapPromise} from '../types/internal';

type ConsoleMessages = UnwrapPromise<ReturnType<typeof testController.getBrowserConsoleMessages>>;

/**
 * Returns an object that contains messages output to the browser console.
 */
export const getBrowserConsoleMessages = (): Promise<ConsoleMessages> => {
  log('Get browser console messages', LogEventType.InternalAction);

  return testController.getBrowserConsoleMessages();
};
