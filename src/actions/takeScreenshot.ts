import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {E2edError} from '../utils/error';
import {getDurationWithUnits} from '../utils/getDurationWithUnits';
import {log} from '../utils/log';
import {getPromiseWithResolveAndReject} from '../utils/promise';

import type {Inner} from 'testcafe-without-typecheck';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((options: Inner.TakeScreenshotOptions & Readonly<{timeout?: number}>) => Promise<void>);

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = (pathOrOptions) => {
  const options = typeof pathOrOptions === 'string' ? {path: pathOrOptions} : pathOrOptions;
  const {fullPage, path: pathToScreenshot, timeout = 10_0000} = options ?? {};

  const timeoutWithUnits = getDurationWithUnits(timeout);

  log(
    'Take a screenshot of the page',
    {fullPage, pathToScreenshot, timeoutWithUnits},
    LogEventType.InternalAction,
  );

  const {promise, reject, setRejectTimeoutFunction} = getPromiseWithResolveAndReject(timeout);

  setRejectTimeoutFunction(() => {
    const error = new E2edError(
      `takeScreenshot promise rejected after ${timeoutWithUnits} timeout`,
      {fullPage, pathToScreenshot},
    );

    reject(error);
  });

  return Promise.race([
    promise,
    testController.takeScreenshot({
      fullPage,
      path: pathToScreenshot,
    } as Inner.TakeScreenshotOptions),
  ]) as Promise<void>;
};
