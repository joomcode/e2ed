import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

/**
 * Set the browser window size.
 */
export const resizeWindow = async (width: number, height: number): Promise<void> => {
  log(
    `Set the browser window size to width ${width} and height ${height}`,
    LogEventType.InternalAction,
  );

  const page = getPlaywrightPage();

  await page.setViewportSize({height, width});
};
