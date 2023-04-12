import {readdir} from 'node:fs/promises';
import {join} from 'node:path';

import {SCREENSHOTS_DIRECTORY_PATH} from '../../constants/internal';

import {assertValueIsTrue} from '../asserts';

import type {TestStaticOptions} from '../../types/internal';

type Return = Readonly<{fullPage: string; viewport: string}>;

const fullPageSuffix = '.fullPage.png';
const viewportSuffix = '.viewport.png';

/**
 * Get filenames with page screenshots taken on test error.
 * @internal
 */
export const getScreenshotFileNames = async (
  directoryName: string,
  testStaticOptions: TestStaticOptions,
): Promise<Return> => {
  const directoryPath = join(SCREENSHOTS_DIRECTORY_PATH, directoryName);
  const alreadyExistingScreenshots = await readdir(directoryPath).catch((): string[] => []);

  const fileNamePrefix = `${testStaticOptions.name}.`.replace(/"/g, '');

  const currentFullPageScreenshotsIndex = Math.max(
    0,
    ...alreadyExistingScreenshots.map((fileName): number => {
      if (!fileName.startsWith(fileNamePrefix) || !fileName.endsWith(fullPageSuffix)) {
        return 0;
      }

      return Number(fileName.slice(fileNamePrefix.length, -fullPageSuffix.length));
    }),
  );

  assertValueIsTrue(
    Number.isInteger(currentFullPageScreenshotsIndex),
    'currentFullPageScreenshotsIndex is integer',
    {alreadyExistingScreenshots, directoryName, testStaticOptions},
  );

  const currentViewportScreenshotsIndex = Math.max(
    0,
    ...alreadyExistingScreenshots.map((fileName): number => {
      if (!fileName.startsWith(fileNamePrefix) || !fileName.endsWith(viewportSuffix)) {
        return 0;
      }

      return Number(fileName.slice(fileNamePrefix.length, -viewportSuffix.length));
    }),
  );

  assertValueIsTrue(
    Number.isInteger(currentViewportScreenshotsIndex),
    'currentViewportScreenshotsIndex is integer',
    {alreadyExistingScreenshots, directoryName, testStaticOptions},
  );

  return {
    fullPage: `${fileNamePrefix}${currentFullPageScreenshotsIndex + 1}${fullPageSuffix}`,
    viewport: `${fileNamePrefix}${currentViewportScreenshotsIndex + 1}${viewportSuffix}`,
  };
};
