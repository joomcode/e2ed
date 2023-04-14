import {LogEventType} from '../constants/internal';
import {testController} from '../testController';
import {log} from '../utils/log';

import type {Inner} from 'testcafe-without-typecheck';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((options: Inner.TakeScreenshotOptions) => Promise<void>);

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = (pathOrOptions) => {
  const options: Inner.TakeScreenshotOptions | undefined =
    typeof pathOrOptions === 'string' ? {path: pathOrOptions} : pathOrOptions;
  const {fullPage, path: pathToScreenshot} = options ?? {};

  log('Take a screenshot of the page', {fullPage, pathToScreenshot}, LogEventType.InternalAction);

  return testController.takeScreenshot(pathOrOptions as never);
};
