import {randomUUID} from 'node:crypto';
import {join} from 'node:path';

import {isLocalRun} from '../../configurator';
import {
  EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
  INTERNAL_REPORTS_DIRECTORY_PATH,
  SCREENSHOT_NOT_SPECIFIED_ERROR_MESSAGE,
} from '../../constants/internal';
import {getOutputDirectoryName} from '../../context/outputDirectoryName';

import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {writeFile} from '../fs';
import {setReadonlyProperty} from '../object';
import {getDimensionsString, getPngDimensions} from '../screenshot';

import {getEmptyAdditionalLogFields} from './getEmptyAdditionalLogFields';
import {getScreenshotMeta} from './getScreenshotMeta';
import {writeScreenshotFromPath} from './writeScreenshotFromPath';

import type {FilePathFromRoot, Selector, ToMatchScreenshotOptions} from '../../types/internal';

import type {Expect} from './Expect';

import {expect as playwrightExpect} from '@playwright/test';

/**
 * Checks that the selector screenshot matches the one specified by `expectedScreenshotId`.
 * @internal
 */
// eslint-disable-next-line complexity, max-statements
export const toMatchScreenshot = async (
  context: Expect,
  expectedScreenshotId: string,
  options: ToMatchScreenshotOptions,
): Promise<void> => {
  const actualValue = context.actualValue as Selector;
  const {description} = context;
  const {getScreenshotUrlById, readScreenshot} = getFullPackConfig().matchScreenshot;

  const assertId = randomUUID();
  const screenshotFileName = `${assertId}.png`;
  const screenshotPath = join(
    EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
    screenshotFileName,
  ) as FilePathFromRoot;

  const additionalLogFields = getEmptyAdditionalLogFields({expectedScreenshotId});

  setReadonlyProperty(context, 'additionalLogFields', additionalLogFields);

  const meta = getScreenshotMeta({actualValue, description, expectedScreenshotId, options});

  let expectedScreenshotFound = false;

  if (expectedScreenshotId) {
    additionalLogFields.expected.url = getScreenshotUrlById(expectedScreenshotId);

    const expectedScreenshot = await readScreenshot(expectedScreenshotId, meta);

    if (expectedScreenshot !== undefined) {
      expectedScreenshotFound = true;

      additionalLogFields.expected.dimensions = getDimensionsString(
        getPngDimensions(expectedScreenshot),
      );

      if (!isLocalRun) {
        await writeFile(screenshotPath, expectedScreenshot);
      }
    }
  }

  const message = expectedScreenshotId
    ? `Cannot read expected screenshot ${expectedScreenshotId}`
    : SCREENSHOT_NOT_SPECIFIED_ERROR_MESSAGE;

  if (isLocalRun) {
    if (expectedScreenshotFound) {
      return;
    }

    throw new E2edError(message);
  }

  const {mask = [], ...restOptions} = options;

  try {
    const playwrightLocator = actualValue.getPlaywrightLocator();

    await playwrightExpect(playwrightLocator, description).toHaveScreenshot(screenshotFileName, {
      mask: mask.map((selector) => selector.getPlaywrightLocator()),
      ...restOptions,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    try {
      const output = join(INTERNAL_REPORTS_DIRECTORY_PATH, getOutputDirectoryName());
      const actualScreenshotPath = join(output, `${assertId}-actual.png`) as FilePathFromRoot;
      const diffScreenshotPath = join(output, `${assertId}-diff.png`) as FilePathFromRoot;

      const actualScreenshotId = await writeScreenshotFromPath({
        additionalLogFields,
        meta,
        path: actualScreenshotPath,
        type: 'actual',
      });

      await writeScreenshotFromPath({
        additionalLogFields,
        meta: {...meta, actual: actualScreenshotId},
        path: diffScreenshotPath,
        type: 'diff',
      });
    } catch (secondError) {
      throw new E2edError(errorMessage, {secondError});
    }

    throw new E2edError(errorMessage);
  }

  if (expectedScreenshotFound) {
    return;
  }

  try {
    await writeScreenshotFromPath({
      additionalLogFields,
      meta,
      path: screenshotPath,
      type: 'actual',
    });
  } catch (secondError) {
    throw new E2edError(message, {secondError});
  }

  throw new E2edError(message);
};
