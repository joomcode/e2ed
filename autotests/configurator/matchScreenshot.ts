import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {isLocalRun} from 'e2ed/configurator';
import {getHash, writeFile} from 'e2ed/utils';

import type {MatchScreenshot} from 'autotests/configurator';
import type {FilePathFromRoot, Url} from 'e2ed/types';

const getPath = (screenshotId: string) =>
  ['autotests', 'fixtures', 'expectedScreenshots', `${screenshotId}.png`] as const;

/**
 * Functions that describe the `toMatchScreenshot` assert (in `expect`).
 */
export const matchScreenshot: MatchScreenshot = {
  getScreenshotUrlById: (screenshotId) => {
    const path = getPath(screenshotId);

    if (isLocalRun) {
      return `../${path.slice(1).join('/')}` as Url;
    }

    return `https://joomcode.github.io/e2ed/${path.slice(-2).join('/')}` as Url;
  },
  readScreenshot: (screenshotId, _meta) => {
    const path = getPath(screenshotId);
    const screenshotPath = join(...path) as FilePathFromRoot;

    return readFile(screenshotPath);
  },
  writeScreenshot: async (screenshot, _meta) => {
    const screenshotId = getHash(screenshot);
    const path = getPath(screenshotId);
    const screenshotPath = join(...path) as FilePathFromRoot;

    await writeFile(screenshotPath, screenshot);

    return screenshotId;
  },
};
