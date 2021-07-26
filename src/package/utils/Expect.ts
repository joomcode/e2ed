import {t as testController} from 'testcafe';

import {log} from './log';
import {print} from './print';

type AssertionKeys = keyof Assertion;

const assertions: Record<AssertionKeys, (...args: unknown[]) => string> = {
  eql: (expected) => `is deeply equal to ${print(expected)}`,
  notEql: (expected) => `is not deeply equal to ${print(expected)}`,
  ok: () => 'is truthy',
  notOk: () => 'is falsy',
  contains: (expected) => `contains ${print(expected)}`,
  notContains: (unexpected) => `not contains ${print(unexpected)}`,
  typeOf: (typeName) => `has type ${print(typeName)}`,
  notTypeOf: (typeName) => `has not type ${print(typeName)}`,
  gt: (expected) => `is strictly greater than ${print(expected)}`,
  gte: (expected) => `is greater than or equal to ${print(expected)}`,
  lt: (expected) => `is less than ${print(expected)}`,
  lte: (expected) => `is less than or equal to ${print(expected)}`,
  within: (start, finish) =>
    `is within a range from ${print(start)} to ${print(finish)} (bounds are inclusive)`,
  notWithin: (start, finish) =>
    `is not within a range from ${print(start)} to ${print(finish)} (bounds are inclusive)`,
  match: (re) => `matches the regular expression ${print(re)}`,
  notMatch: (re) => `does not match the regular expression ${print(re)}`,
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
