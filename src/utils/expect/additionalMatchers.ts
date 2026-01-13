/* eslint-disable @typescript-eslint/require-await */

import {toMatchScreenshot} from './toMatchScreenshot';

import type {Selector} from '../../types/internal';

import type {Expect} from './Expect';
import type {NonSelectorAdditionalMatchers, SelectorMatchers} from './types';

import {expect as playwrightExpect} from '@playwright/test';

/**
 * Addition matchers.
 * @internal
 */
export const additionalMatchers: NonSelectorAdditionalMatchers<unknown> & SelectorMatchers = {
  async contains(this: Expect, expected) {
    const {actualValue, description} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return playwrightExpect(actualValue, description).toContain(expected);
    }

    return playwrightExpect(actualValue, description).toEqual(
      playwrightExpect.objectContaining(expected as Record<string, unknown>),
    );
  },
  async eql(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toEqual(expected);
  },
  async gt(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toBeGreaterThan(expected);
  },
  async gte(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toBeGreaterThanOrEqual(expected);
  },
  async lt(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toBeLessThan(expected);
  },
  async lte(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toBeLessThanOrEqual(expected);
  },
  async match(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toMatch(expected);
  },
  async notContains(this: Expect, expected) {
    const {actualValue, description} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return playwrightExpect(actualValue, description).not.toContain(expected);
    }

    return playwrightExpect(actualValue, description).not.toEqual(
      playwrightExpect.objectContaining(expected as Record<string, unknown>),
    );
  },
  async notEql(this: Expect, expected) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).not.toEqual(expected);
  },
  async notOk(this: Expect) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).not.toBeTruthy();
  },
  async ok(this: Expect) {
    const {actualValue, description} = this;

    return playwrightExpect(actualValue, description).toBeTruthy();
  },

  async toBeInViewport(this: Expect, options = {}) {
    const {actualValue, description} = this;
    const selector = actualValue as Selector;

    return playwrightExpect(selector.getPlaywrightLocator(), description).toBeInViewport(options);
  },

  toMatchScreenshot(this: Expect, expectedScreenshotId, options = {}) {
    return toMatchScreenshot(this, expectedScreenshotId, options);
  },
};
