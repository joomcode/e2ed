import {valueToString} from '../valueToString';

import type {AssertionFunctionsRecord} from './types';

/**
 * Assertion message getters.
 * @internal
 */
export const assertionMessageGetters: AssertionFunctionsRecord<string> = {
  contains: (expected) => `contains ${valueToString(expected)}`,
  eql: (expected) => `is deeply equal to ${valueToString(expected)}`,
  gt: (expected) => `is strictly greater than ${valueToString(expected)}`,
  gte: (expected) => `is greater than or equal to ${valueToString(expected)}`,
  lt: (expected) => `is less than ${valueToString(expected)}`,
  lte: (expected) => `is less than or equal to ${valueToString(expected)}`,
  match: (re) => `matches the regular expression ${valueToString(re)}`,
  notContains: (unexpected) => `not contains ${valueToString(unexpected)}`,
  notEql: (unexpected) => `is not deeply equal to ${valueToString(unexpected)}`,
  notOk: () => 'is falsy',
  ok: () => 'is truthy',
  toMatchScreenshot: (expected) => `matches the expected screenshot ${valueToString(expected)}`,
};
