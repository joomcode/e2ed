import {LogEventType} from '../constants/internal';
import {getPlaywrightPage} from '../useContext';
import {log} from '../utils/log';

import type {Page} from '@playwright/test';

import type {Url} from '../types/internal';

type Options = Readonly<{skipLogs?: boolean} & Parameters<Page['goto']>[1]>;

/**
 * Navigate to the `url` (without waiting of interface stabilization).
 */
export const navigateToUrl = async (url: Url, options: Options = {}): Promise<void> => {
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
