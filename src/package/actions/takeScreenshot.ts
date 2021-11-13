import {testController} from '../testController';
import {log} from '../utils/log';

import type {Inner} from 'testcafe-without-typecheck';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((options: Inner.TakeScreenshotOptions) => Promise<void>);

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = async (pathOrOptions) => {
  await log('Take a screenshot of the tested page', 'internalAction');

  return testController.takeScreenshot(pathOrOptions as never);
};
