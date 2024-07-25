import {LogEventType} from '../constants/internal';
import {getPage} from '../useContext';
import {log} from '../utils/log';

import type {Url} from '../types/internal';

type Options = Readonly<{
  skipLogs?: boolean;
}>;

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (url: Url, options: Options = {}): Promise<void> => {
  const {skipLogs = false} = options;

  if (skipLogs !== true) {
    log(`Will navigate to the url ${url}`, LogEventType.InternalAction);
  }

  const page = getPage();

  await page.goto(url);

  if (skipLogs !== true) {
    log(`Navigation to the url ${url} completed`, LogEventType.InternalAction);
  }
};
