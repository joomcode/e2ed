import type {Expect} from './Expect';
import type {AdditionalMatchers} from './types';

import {expect} from '@playwright/test';

/**
 * Addition matchers.
 * @internal
 */
export const additionalMatchers: AdditionalMatchers<unknown> = {
  contains(this: Expect, expected) {
    const {actualValue} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return Promise.resolve(expect(actualValue).toContain(expected));
    }

    return Promise.resolve(
      expect(actualValue).toEqual(expect.objectContaining(expected as Record<string, unknown>)),
    );
  },
  eql(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toEqual(expected));
  },
  gt(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toBeGreaterThan(expected));
  },
  gte(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toBeGreaterThanOrEqual(expected));
  },
  lt(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toBeLessThan(expected));
  },
  lte(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toBeLessThanOrEqual(expected));
  },
  match(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toMatch(expected));
  },
  notContains(this: Expect, expected) {
    const {actualValue} = this;

    if (typeof actualValue === 'string' || Array.isArray(actualValue)) {
      return Promise.resolve(expect(actualValue).not.toContain(expected));
    }

    return Promise.resolve(
      expect(actualValue).not.toEqual(expect.objectContaining(expected as Record<string, unknown>)),
    );
  },
  notEql(this: Expect, expected) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).not.toEqual(expected));
  },
  notOk(this: Expect) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).not.toBeTruthy());
  },
  ok(this: Expect) {
    const {actualValue} = this;

    return Promise.resolve(expect(actualValue).toBeTruthy());
  },
};
