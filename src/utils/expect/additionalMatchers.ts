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

  toMatchScreenshot(this: Expect, expectedScreenshotId, options = {}) {
    return toMatchScreenshot(this, expectedScreenshotId, options);
  },
};
