/* eslint-disable @typescript-eslint/require-await */

import {toMatchScreenshot} from './toMatchScreenshot';

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
  async eql(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toEqual(expected);
  },
  async gt(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toBeGreaterThan(expected);
  },
  async gte(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toBeGreaterThanOrEqual(expected);
  },
  async lt(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toBeLessThan(expected);
  },
  async lte(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toBeLessThanOrEqual(expected);
  },
  async match(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toMatch(expected);
  },
  async notContains(this: Expect, expected) {
    const {actualValue, description} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return expect(actualValue, description).not.toContain(expected);
    }

    return expect(actualValue, description).not.toEqual(
      expect.objectContaining(expected as Record<string, unknown>),
    );
  },
  async notEql(this: Expect, expected) {
    const {actualValue, description} = this;

    return expect(actualValue, description).not.toEqual(expected);
  },
  async notOk(this: Expect) {
    const {actualValue, description} = this;

    return expect(actualValue, description).not.toBeTruthy();
  },
  async ok(this: Expect) {
    const {actualValue, description} = this;

    return expect(actualValue, description).toBeTruthy();
  },

  toMatchScreenshot(this: Expect, expectedScreenshotId, options = {}) {
    return toMatchScreenshot(this, expectedScreenshotId, options);
  },
};
