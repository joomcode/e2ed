import {randomUUID} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {isLocalRun} from '../../configurator';
import {
  EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
  INTERNAL_REPORTS_DIRECTORY_PATH,
} from '../../constants/internal';
import {getOutputDirectoryName} from '../../context/outputDirectoryName';

import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {writeFile} from '../fs';
import {setReadonlyProperty} from '../object';

import {getScreenshotMeta} from './getScreenshotMeta';

import type {FilePathFromRoot, Selector, ToMatchScreenshotOptions, Url} from '../../types/internal';

import type {Expect} from './Expect';

import {expect} from '@playwright/test';

type AdditionalLogFields = {
  actualScreenshotId: string | undefined;
  actualScreenshotUrl: Url | undefined;
  diffScreenshotId: string | undefined;
  diffScreenshotUrl: Url | undefined;
  expectedScreenshotId: string;
  expectedScreenshotUrl: Url | undefined;
};

/**
 * Checks that the selector screenshot matches the one specified by `expectedScreenshotId`.
 * @internal
 */
// eslint-disable-next-line max-statements
export const toMatchScreenshot = async (
  context: Expect,
  expectedScreenshotId: string,
  options: ToMatchScreenshotOptions,
): Promise<void> => {
  const actualValue = context.actualValue as Selector;
  const {description} = context;
  const {getScreenshotUrlById, readScreenshot, writeScreenshot} =
    getFullPackConfig().matchScreenshot;

  const assertId = randomUUID();
  const screenshotFileName = `${assertId}.png`;
  const screenshotPath = join(
    EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
    screenshotFileName,
  ) as FilePathFromRoot;

  const additionalLogFields: AdditionalLogFields = {
    actualScreenshotId: undefined,
    actualScreenshotUrl: undefined,
    diffScreenshotId: undefined,
    diffScreenshotUrl: undefined,
    expectedScreenshotId,
    expectedScreenshotUrl: undefined,
  };

  setReadonlyProperty(context, 'additionalLogFields', additionalLogFields);

  const meta = getScreenshotMeta({actualValue, description, expectedScreenshotId, options});

  let expectedScreenshotFound = false;

  if (expectedScreenshotId) {
    additionalLogFields.expectedScreenshotUrl = getScreenshotUrlById(expectedScreenshotId);

    const expectedScreenshot = await readScreenshot(expectedScreenshotId, meta);

    if (expectedScreenshot !== undefined) {
      expectedScreenshotFound = true;

      if (!isLocalRun) {
        await writeFile(screenshotPath, expectedScreenshot);
      }
    }
  }

  const message = expectedScreenshotId
    ? `Cannot read expected screenshot ${expectedScreenshotId}`
    : 'Expected screenshot not specified';

  if (isLocalRun) {
    if (expectedScreenshotFound) {
      return;
    }

    throw new E2edError(message);
  }

  const {mask = [], ...restOptions} = options;

  try {
    const playwrightLocator = actualValue.getPlaywrightLocator();

    await expect(playwrightLocator, description).toHaveScreenshot(screenshotFileName, {
      mask: mask.map((selector) => selector.getPlaywrightLocator()),
      ...restOptions,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    const output = join(INTERNAL_REPORTS_DIRECTORY_PATH, getOutputDirectoryName());
    const actualScreenshotPath = join(output, `${assertId}-actual.png`) as FilePathFromRoot;
    const diffScreenshotPath = join(output, `${assertId}-diff.png`) as FilePathFromRoot;

    const actualScreenshot = await readFile(actualScreenshotPath);
    const actualScreenshotId = await writeScreenshot(actualScreenshot, meta);

    additionalLogFields.actualScreenshotId = actualScreenshotId;
    additionalLogFields.actualScreenshotUrl = getScreenshotUrlById(actualScreenshotId);

    const diffScreenshot = await readFile(diffScreenshotPath);
    const diffScreenshotId = await writeScreenshot(diffScreenshot, {
      ...meta,
      actual: actualScreenshotId,
    });

    additionalLogFields.diffScreenshotId = diffScreenshotId;
    additionalLogFields.diffScreenshotUrl = getScreenshotUrlById(diffScreenshotId);

    throw new E2edError(errorMessage);
  }

  if (expectedScreenshotFound) {
    return;
  }

  const actualScreenshot = await readFile(screenshotPath);
  const actualScreenshotId = await writeScreenshot(actualScreenshot, meta);

  additionalLogFields.actualScreenshotId = actualScreenshotId;
  additionalLogFields.actualScreenshotUrl = getScreenshotUrlById(actualScreenshotId);

  throw new E2edError(message);
};
