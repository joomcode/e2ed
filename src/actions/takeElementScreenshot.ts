import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {getLocatorFromSelector} from '../utils/locators';
import {log} from '../utils/log';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.takeElementScreenshot>[2];

/**
 * Takes a screenshot of the specified element.
 */
export const takeElementScreenshot = (
  selector: Selector,
  pathToScreenshot?: string,
  options?: Options,
): Promise<void> => {
  const locator = getLocatorFromSelector(selector);

  log(
    'Take a screenshot of the element',
    {locator, options, pathToScreenshot},
    LogEventType.InternalAction,
  );

  return testController.takeElementScreenshot(
    selector as TestCafeSelector,
    pathToScreenshot,
    options,
  );
};
