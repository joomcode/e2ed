import {testController} from '../testController';

import {log} from './log';
import {valueToString} from './valueToString';

import type {Inner} from 'testcafe-without-typecheck';

type AssertionKeys = keyof Inner.Assertion;

const assertions: Record<AssertionKeys, (...args: unknown[]) => string> = {
  eql: (expected) => `is deeply equal to ${valueToString(expected)}`,
  notEql: (expected) => `is not deeply equal to ${valueToString(expected)}`,
  ok: () => 'is truthy',
  notOk: () => 'is falsy',
  contains: (expected) => `contains ${valueToString(expected)}`,
  notContains: (unexpected) => `not contains ${valueToString(unexpected)}`,
  typeOf: (typeName) => `has type ${valueToString(typeName)}`,
  notTypeOf: (typeName) => `has not type ${valueToString(typeName)}`,
  gt: (expected) => `is strictly greater than ${valueToString(expected)}`,
  gte: (expected) => `is greater than or equal to ${valueToString(expected)}`,
  lt: (expected) => `is less than ${valueToString(expected)}`,
  lte: (expected) => `is less than or equal to ${valueToString(expected)}`,
  within: (start, finish) =>
    `is within a range from ${valueToString(start)} to ${valueToString(
      finish,
    )} (bounds are inclusive)`,
  notWithin: (start, finish) =>
    `is not within a range from ${valueToString(start)} to ${valueToString(
      finish,
    )} (bounds are inclusive)`,
  match: (re) => `matches the regular expression ${valueToString(re)}`,
  notMatch: (re) => `does not match the regular expression ${valueToString(re)}`,
};

/**
 * testController.expect wrapper with logs.
 * @internal
 */
export class Expect {
  constructor(public value: unknown, public description: string) {}

  [key: string]: unknown;
}

for (const [key, getAssertionMessage] of Object.entries(assertions)) {
  Expect.prototype[key] = function method(...args: unknown[]) {
    const message = getAssertionMessage(...args);

    log(`Assert that value ${message}`, {description: this.description});

    // @ts-expect-error: args have different types for different assertions
    return testController.expect(this.value)[key as AssertionKeys](...args) as unknown;
  };
}
