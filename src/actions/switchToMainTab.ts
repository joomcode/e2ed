import {LogEventType} from '../constants/internal';
import {clearTab} from '../context/tab';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

/**
 * Switches page context to the specified tab.
 */
export const switchToMainTab = (): void => {
  const page = getPlaywrightPage();
  const url = page.url();

  log(`Switch page context to the main tab at ${url}`, LogEventType.InternalAction);

  clearTab();
};
