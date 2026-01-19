import {join} from 'node:path';

import {
  ADDITIONAL_STEP_TIMEOUT,
  LogEventType,
  SCREENSHOTS_DIRECTORY_PATH,
} from '../constants/internal';
import {step} from '../step';
import {getPlaywrightPage} from '../useContext';
import {getDimensionsString, getPngDimensions} from '../utils/screenshot';

import type {Page} from '@playwright/test';

type Options = Parameters<Page['screenshot']>[0];

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot = async (options: Options = {}): Promise<void> => {
  const {path: pathToScreenshot, ...optionsWithoutPath} = options;
  const {timeout} = options;

  await step(
    'Take a screenshot of the page',
    async () => {
      if (pathToScreenshot !== undefined) {
        // eslint-disable-next-line no-param-reassign
        options.path = join(SCREENSHOTS_DIRECTORY_PATH, pathToScreenshot);
      }

      const page = getPlaywrightPage();

      const screenshot = await page.screenshot(options);
      const dimensions = getDimensionsString(getPngDimensions(screenshot));

      return {dimensions};
    },
    {
      payload: {pathToScreenshot, ...optionsWithoutPath},
      ...(timeout !== undefined ? {timeout: timeout + ADDITIONAL_STEP_TIMEOUT} : undefined),
      type: LogEventType.InternalAction,
    },
  );
};
