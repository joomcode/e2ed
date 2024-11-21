import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

import type {NavigateToUrlOptions, Url} from '../types/internal';

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (
  url: Url,
  options: NavigateToUrlOptions = {},
): Promise<void> => {
  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, options, LogEventType.InternalAction);
  }

  const page = getPlaywrightPage();

  await page.goto(url, options);

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, options, LogEventType.InternalAction);
  }
};
