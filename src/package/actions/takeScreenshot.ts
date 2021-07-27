import {t as testController} from 'testcafe';

import {log} from '../utils/log';

type TakeScreenshot = ((path?: string) => Promise<void>) &
  ((options: TakeScreenshotOptions) => Promise<void>);

/**
 * Takes a screenshot of the tested page.
 */
export const takeScreenshot: TakeScreenshot = (pathOrOptions) => {
  log('Take a screenshot of the tested page');

  return testController.takeScreenshot(pathOrOptions as never);
};
