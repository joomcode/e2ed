import {join} from 'node:path';

import {LogEventType, SCREENSHOTS_DIRECTORY_PATH} from '../constants/internal';
import {getPage} from '../useContext';
import {log} from '../utils/log';

import type {Page} from '@playwright/test';

type Options = Parameters<Page['screenshot']>[0];

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot = async (options: Options = {}): Promise<void> => {
  log('Take a screenshot of the page', {...options}, LogEventType.InternalAction);

  const page = getPage();

  const {path} = options;

  if (path !== undefined) {
    // eslint-disable-next-line no-param-reassign
    options.path = join(SCREENSHOTS_DIRECTORY_PATH, path);
  }

  await page.screenshot(options);
};
