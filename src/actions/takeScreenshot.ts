import {join} from 'node:path';

import {LogEventType, SCREENSHOTS_DIRECTORY_PATH} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';

import type {Page} from '@playwright/test';

type Options = Parameters<Page['screenshot']>[0];

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot = async (options: Options = {}): Promise<void> => {
  const {path: pathToScreenshot, ...optionsWithoutPath} = options;

  await step(
    'Take a screenshot of the page',
    async () => {
      if (pathToScreenshot !== undefined) {
        // eslint-disable-next-line no-param-reassign
        options.path = join(SCREENSHOTS_DIRECTORY_PATH, pathToScreenshot);
      }

      const page = getPlaywrightPage();

      await page.screenshot(options);
    },
    {payload: {pathToScreenshot, ...optionsWithoutPath}, type: LogEventType.InternalAction},
  );
};
