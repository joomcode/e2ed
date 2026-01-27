import {readFile} from 'node:fs/promises';

import {getFullPackConfig} from '../config';
import {getDimensionsString, getPngDimensions} from '../screenshot';

import type {FilePathFromRoot, ScreenshotMeta} from '../../types/internal';

import type {AdditionalLogFields} from './types';

type Options = Readonly<{
  additionalLogFields: AdditionalLogFields;
  meta: ScreenshotMeta;
  path: FilePathFromRoot;
  type: Exclude<keyof AdditionalLogFields, 'expected' | 'isLocalRun'>;
}>;

/**
 * Reads screenshot from path and writes to storage.
 * @internal
 */
export const writeScreenshotFromPath = async ({
  additionalLogFields,
  meta,
  path,
  type,
}: Options): Promise<string> => {
  const {getScreenshotUrlById, writeScreenshot} = getFullPackConfig().matchScreenshot;

  const screenshot = await readFile(path);
  const screenshotId = await writeScreenshot(screenshot, meta);

  const dimensions = getDimensionsString(getPngDimensions(screenshot));
  const url = getScreenshotUrlById(screenshotId);

  // eslint-disable-next-line no-param-reassign
  additionalLogFields[type] = {dimensions, screenshotId, url};

  return screenshotId;
};
