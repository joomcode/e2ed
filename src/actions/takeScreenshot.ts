import {DEFAULT_TAKE_SCREENSHOT_TIMEOUT_IN_MS, LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {E2edError} from '../utils/error';
import {getDurationWithUnits} from '../utils/getDurationWithUnits';
import {log} from '../utils/log';
import {getPromiseWithResolveAndReject} from '../utils/promise';

import type {Inner} from 'testcafe-without-typecheck';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((
    options: Omit<Inner.TakeScreenshotOptions, 'pathPattern'> & Readonly<{timeout?: number}>,
  ) => Promise<void>);

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = (pathOrOptions) => {
  const options = typeof pathOrOptions === 'string' ? {path: pathOrOptions} : pathOrOptions;
  const {
    fullPage = false,
    path: pathToScreenshot,
    timeout = DEFAULT_TAKE_SCREENSHOT_TIMEOUT_IN_MS,
  } = options ?? {};

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    'Take a screenshot of the page',
    {fullPage, pathToScreenshot, timeoutWithUnits},
    LogEventType.InternalAction,
  );

  const takeScreenshotOptions: Inner.TakeScreenshotOptions = {
    fullPage,
    path: pathToScreenshot as string,
  };
  const takeScreenshotPromise = testController.takeScreenshot(takeScreenshotOptions);

  if (!(timeout > 0)) {
    return takeScreenshotPromise;
  }

  const {clearRejectTimeout, promiseWithTimeout, reject, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject(timeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `takeScreenshot promise rejected after ${timeoutWithUnits} timeout`,
      {fullPage, pathToScreenshot},
    );

    reject(error);
  });

  const racePromise = Promise.race([takeScreenshotPromise, promiseWithTimeout]);

  return racePromise.finally(clearRejectTimeout) as Promise<void>;
};
