import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

/**
 * Set the browser window size.
 */
export const resizeWindow = (width: number, height: number): Promise<void> => {
  log(
    `Set the browser window size to width ${width} and height ${height}`,
    LogEventType.InternalAction,
  );

  return testController.resizeWindow(width, height);
};
