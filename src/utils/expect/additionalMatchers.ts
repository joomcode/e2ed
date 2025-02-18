/* eslint-disable max-lines */

import {randomUUID} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';

import {
  EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
  INTERNAL_REPORTS_DIRECTORY_PATH,
} from '../../constants/internal';
import {getOutputDirectoryName} from '../../context/outputDirectoryName';

import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {writeFile} from '../fs';

import type {FilePathFromRoot, Selector} from '../../types/internal';

import type {Expect} from './Expect';
import type {NonSelectorAdditionalMatchers, SelectorMatchers} from './types';

import {expect} from '@playwright/test';

/**
 * Addition matchers.
 * @internal
 */
export const additionalMatchers: NonSelectorAdditionalMatchers<unknown> & SelectorMatchers = {
  contains(this: Expect, expected) {
    const {actualValue, description} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return Promise.resolve(expect(actualValue, description).toContain(expected));
    }

    return Promise.resolve(
      expect(actualValue, description).toEqual(
        expect.objectContaining(expected as Record<string, unknown>),
      ),
    );
  },
  eql(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toEqual(expected));
  },
  gt(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toBeGreaterThan(expected));
  },
  gte(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toBeGreaterThanOrEqual(expected));
  },
  lt(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toBeLessThan(expected));
  },
  lte(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toBeLessThanOrEqual(expected));
  },
  match(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toMatch(expected));
  },
  notContains(this: Expect, expected) {
    const {actualValue, description} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return Promise.resolve(expect(actualValue, description).not.toContain(expected));
    }

    return Promise.resolve(
      expect(actualValue, description).not.toEqual(
        expect.objectContaining(expected as Record<string, unknown>),
      ),
    );
  },
  notEql(this: Expect, expected) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).not.toEqual(expected));
  },
  notOk(this: Expect) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).not.toBeTruthy());
  },
  ok(this: Expect) {
    const {actualValue, description} = this;

    return Promise.resolve(expect(actualValue, description).toBeTruthy());
  },

  // eslint-disable-next-line max-statements
  async toMatchScreenshot(this: Expect, expectedScreenshotId, options = {}) {
    const {actualValue, description} = this;
    const {readScreenshot, writeScreenshot} = getFullPackConfig().matchScreenshot;

    const assertId = randomUUID();
    const screenshotFileName = `${assertId}.png`;
    const screenshotPath = join(
      EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
      screenshotFileName,
    ) as FilePathFromRoot;
    const playwrightLocator = (actualValue as Selector).getPlaywrightLocator();

    let expectedScreenshotFound = false;

    if (expectedScreenshotId) {
      const expectedScreenshot = await readScreenshot(expectedScreenshotId);

      if (expectedScreenshot !== undefined) {
        expectedScreenshotFound = true;
        await writeFile(screenshotPath, expectedScreenshot);
      }
    }

    const {mask = [], ...restOptions} = options;

    try {
      await expect(playwrightLocator, description).toHaveScreenshot(screenshotFileName, {
        mask: mask.map((selector) => selector.getPlaywrightLocator()),
        ...restOptions,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      const output = join(INTERNAL_REPORTS_DIRECTORY_PATH, getOutputDirectoryName());
      const actualScreenshotPath = join(output, `${assertId}-actual.png`) as FilePathFromRoot;
      const diffScreenshotPath = join(output, `${assertId}-diff.png`) as FilePathFromRoot;

      const actualScreenshot = await readFile(actualScreenshotPath);
      const actualScreenshotId = await writeScreenshot(actualScreenshot);

      const diffScreenshot = await readFile(diffScreenshotPath);
      const diffScreenshotId = await writeScreenshot(diffScreenshot);

      throw new E2edError(message, {
        actualScreenshotId,
        diffScreenshotId,
        expectedScreenshotId,
        options,
      });
    }

    if (expectedScreenshotFound) {
      return;
    }

    const actualScreenshot = await readFile(screenshotPath);
    const actualScreenshotId = await writeScreenshot(actualScreenshot);

    const message = expectedScreenshotId
      ? `Cannot read expected screenshot ${expectedScreenshotId}`
      : 'Expected screenshot not specified';

    throw new E2edError(message, {actualScreenshotId, expectedScreenshotId, options});
  },
};
