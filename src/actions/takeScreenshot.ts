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
  log('Take a screenshot of the tested page', {pathOrOptions}, LogEventType.InternalAction);

  return testController.takeScreenshot(pathOrOptions as never);
};
