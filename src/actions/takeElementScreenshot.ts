import {join} from 'node:path';

import {LogEventType, SCREENSHOTS_DIRECTORY_PATH} from '../constants/internal';
import {log} from '../utils/log';

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

  log(
    'Take a screenshot of the element',
    {pathToScreenshot, ...optionsWithoutPath, selector},
    LogEventType.InternalAction,
  );

  if (pathToScreenshot !== undefined) {
    // eslint-disable-next-line no-param-reassign
    options.path = join(SCREENSHOTS_DIRECTORY_PATH, pathToScreenshot);
  }

  await selector.getPlaywrightLocator().screenshot(options);
};
