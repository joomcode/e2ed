import {valueToString} from '../generalLog';

import type {AssertionFunctions} from './types';

/**
 * Assertion message getters.
 * @internal
 */
export const assertionMessageGetters: AssertionFunctions<string> = {
  contains: (expected) => `contains ${valueToString(expected)}`,
  eql: (expected) => `is deeply equal to ${valueToString(expected)}`,
  gt: (expected) => `is strictly greater than ${valueToString(expected)}`,
  gte: (expected) => `is greater than or equal to ${valueToString(expected)}`,
  lt: (expected) => `is less than ${valueToString(expected)}`,
  lte: (expected) => `is less than or equal to ${valueToString(expected)}`,
  match: (re) => `matches the regular expression ${valueToString(re)}`,
  notContains: (unexpected) => `not contains ${valueToString(unexpected)}`,
  notEql: (unexpected) => `is not deeply equal to ${valueToString(unexpected)}`,
  notMatch: (re) => `does not match the regular expression ${valueToString(re)}`,
  notOk: () => 'is falsy',
  notTypeOf: (typeName) => `has not type ${valueToString(typeName)}`,
  notWithin: (start, end) =>
    `is not within a range from ${valueToString(start)} to ${valueToString(
      end,
    )} (bounds are inclusive)`,
  ok: () => 'is truthy',
  typeOf: (typeName) => `has type ${valueToString(typeName)}`,
  within: (start, end) =>
    `is within a range from ${valueToString(start)} to ${valueToString(
      end,
    )} (bounds are inclusive)`,
};
