import {t as testController} from 'testcafe';

import {log} from '../utils/log';

/**
 * Sets the browser window size.
 */
export const resizeWindow = (width: number, height: number): Promise<void> => {
  log(`Set the browser window size to width ${width} and height ${height}`);

  return testController.resizeWindow(width, height);
};
