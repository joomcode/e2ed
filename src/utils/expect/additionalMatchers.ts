import {randomUUID} from 'node:crypto';
import {join} from 'node:path';

import {EXPECTED_SCREENSHOTS_DIRECTORY_PATH} from '../../constants/internal';

import {getFullPackConfig} from '../config';
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

  async toMatchScreenshot(this: Expect, screenshotId) {
    const {actualValue, description} = this;
    const {getScreenshotIdUrl, readScreenshot, writeScreenshot} =
      getFullPackConfig().matchScreenshot;

    const screenshotFileName = `${randomUUID()}.png`;
    const screenshotPath = join(
      EXPECTED_SCREENSHOTS_DIRECTORY_PATH,
      screenshotFileName,
    ) as FilePathFromRoot;
    const playwrightLocator = (actualValue as Selector).getPlaywrightLocator();

    let screenshotNotFoundById = false;

    if (screenshotId) {
      const screenshot = await readScreenshot(screenshotId);

      if (screenshot === undefined) {
        screenshotNotFoundById = true;
      } else {
        await writeFile(screenshotPath, screenshot);
      }
    }

    await expect(playwrightLocator, description).toHaveScreenshot(screenshotFileName);
  },
};
