import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {E2edError} from '../utils/error';
import {getDurationWithUnits} from '../utils/getDurationWithUnits';
import {log} from '../utils/log';
import {getPromiseWithResolveAndReject} from '../utils/promise';

import type {Inner} from 'testcafe-without-typecheck';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((options: Inner.TakeScreenshotOptions & Readonly<{timeout?: number}>) => Promise<void>);

const defaultTimeoutInMs = 20_000;

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = (pathOrOptions) => {
  const options = typeof pathOrOptions === 'string' ? {path: pathOrOptions} : pathOrOptions;
  const {fullPage, path: pathToScreenshot, timeout = defaultTimeoutInMs} = options ?? {};

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    'Take a screenshot of the page',
    {fullPage, pathToScreenshot, timeoutWithUnits},
    LogEventType.InternalAction,
  );

  const {clearRejectTimeout, promiseWithTimeout, reject, setRejectTimeoutFunction} =
    getPromiseWithResolveAndReject(timeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `takeScreenshot promise rejected after ${timeoutWithUnits} timeout`,
      {fullPage, pathToScreenshot},
    );

    reject(error);
  });

  const takeScreenshotOptions = {fullPage, path: pathToScreenshot} as Inner.TakeScreenshotOptions;

  const takeScreenshotPromise = testController.takeScreenshot(takeScreenshotOptions);

  const racePromise = Promise.race([takeScreenshotPromise, promiseWithTimeout]);

  return racePromise.finally(clearRejectTimeout) as Promise<void>;
};
