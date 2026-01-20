import {join} from 'node:path';

import {
  ADDITIONAL_STEP_TIMEOUT,
  LogEventType,
  SCREENSHOTS_DIRECTORY_PATH,
} from '../constants/internal';
import {step} from '../step';
import {getDimensionsString, getPngDimensions} from '../utils/screenshot';

import type {Locator} from '@playwright/test';

import type {Selector} from '../types/internal';

type Options = Parameters<Locator['screenshot']>[0];

/**
 * Takes a screenshot of the specified element.
 */
export const takeElementScreenshot = async (
  selector: Selector,
  options: Options = {},
): Promise<void> => {
  const {path: pathToScreenshot, ...optionsWithoutPath} = options;
  const {timeout} = options;

  await step(
    'Take a screenshot of the element',
    async () => {
      if (pathToScreenshot !== undefined) {
        // eslint-disable-next-line no-param-reassign
        options.path = join(SCREENSHOTS_DIRECTORY_PATH, pathToScreenshot);
      }

      const screenshot = await selector.getPlaywrightLocator().screenshot(options);
      const dimensions = getDimensionsString(getPngDimensions(screenshot));

      return {dimensions};
    },
    {
      payload: {pathToScreenshot, ...optionsWithoutPath, selector},
      ...(timeout !== undefined ? {timeout: timeout + ADDITIONAL_STEP_TIMEOUT} : undefined),
      type: LogEventType.InternalAction,
    },
  );
};
