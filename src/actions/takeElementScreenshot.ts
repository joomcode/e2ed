import {DEFAULT_TAKE_SCREENSHOT_TIMEOUT_IN_MS, LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {E2edError} from '../utils/error';
import {getDurationWithUnits} from '../utils/getDurationWithUnits';
import {log} from '../utils/log';
import {getPromiseWithResolveAndReject} from '../utils/promise';
import {getDescriptionFromSelector} from '../utils/selectors';

import type {Selector, TestCafeSelector} from '../types/internal';

type Options = Parameters<typeof testController.takeElementScreenshot>[2] &
  Readonly<{timeout?: number}>;

/**
 * Takes a screenshot of the specified element.
 */
export const takeElementScreenshot = (
  selector: Selector,
  pathToScreenshot?: string,
  {timeout = DEFAULT_TAKE_SCREENSHOT_TIMEOUT_IN_MS, ...options}: Options = {},
): Promise<void> => {
  const description = getDescriptionFromSelector(selector);

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    'Take a screenshot of the element',
    {description, options, pathToScreenshot, timeoutWithUnits},
    LogEventType.InternalAction,
  );

  const takeElementScreenshotPromise = testController.takeElementScreenshot(
    selector as unknown as TestCafeSelector,
    pathToScreenshot,
    options,
  );

  if (!(timeout > 0)) {
    return takeElementScreenshotPromise;
  }

  const {clearRejectTimeout, promiseWithTimeout, reject, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject(timeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `takeElementScreenshot promise rejected after ${timeoutWithUnits} timeout`,
      {description, options, pathToScreenshot},
    );

    reject(error);
  });

  const racePromise = Promise.race([takeElementScreenshotPromise, promiseWithTimeout]);

  return racePromise.finally(clearRejectTimeout) as Promise<void>;
};
