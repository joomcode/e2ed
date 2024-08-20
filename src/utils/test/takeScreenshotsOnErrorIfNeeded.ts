import {join} from 'node:path';

// eslint-disable-next-line import/no-internal-modules
import {takeScreenshot} from '../../actions/takeScreenshot';
import {getRetryIndex} from '../../context/retryIndex';

import {getFullPackConfig} from '../config';

import {getScreenshotFileNames} from './getScreenshotFileNames';

import type {TestStaticOptions} from '../../types/internal';

const errorScreenshotTimeoutInMs = 2_000;

/**
 * Takes page screenshot and full page screenshot, if needed.
 * @internal
 */
export const takeScreenshotsOnErrorIfNeeded = async (
  testStaticOptions: TestStaticOptions,
): Promise<void> => {
  const {
    takeFullPageScreenshotOnError: takeFullPageScreenshotOnErrorFromConfig,
    takeViewportScreenshotOnError: takeViewportScreenshotOnErrorFromConfig,
  } = getFullPackConfig();
  const {options} = testStaticOptions;

  const takeFullPageScreenshotOnError =
    options.takeFullPageScreenshotOnError ?? takeFullPageScreenshotOnErrorFromConfig;
  const takeViewportScreenshotOnError =
    options.takeViewportScreenshotOnError ?? takeViewportScreenshotOnErrorFromConfig;

  if (!takeFullPageScreenshotOnError && !takeViewportScreenshotOnError) {
    return;
  }

  const retryIndex = getRetryIndex();
  const retryDirectoryName = `retry${retryIndex}`;

  const {fullPage, viewport} = await getScreenshotFileNames(retryDirectoryName, testStaticOptions);

  if (takeFullPageScreenshotOnError) {
    await takeScreenshot({
      fullPage: true,
      path: join(retryDirectoryName, fullPage),
      timeout: errorScreenshotTimeoutInMs,
    });
  }

  if (takeViewportScreenshotOnError) {
    await takeScreenshot({
      fullPage: false,
      path: join(retryDirectoryName, viewport),
      timeout: errorScreenshotTimeoutInMs,
    });
  }
};
