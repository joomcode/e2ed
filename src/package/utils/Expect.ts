import {testController} from '../testController';

import {E2EDError} from './E2EDError';
import {log} from './log';
import {valueToString} from './valueToString';

import type {Inner} from 'testcafe-without-typecheck';

type AssertionKeys = keyof Inner.Assertion;

type Assert<T> = Record<AssertionKeys, (...args: unknown[]) => T>;

const assertions: Assert<string> = {
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
  constructor(public actual: unknown, public description: string) {}

  [key: string]: unknown;
}

for (const [key, getAssertionMessage] of Object.entries(assertions)) {
  Expect.prototype[key] = function method(...args: unknown[]) {
    const payload = {description: this.description};
    const expectedDescription = getAssertionMessage(...args);

    // Wrap the actual value in a promise, then convert it to a string.
    const actualPromise = Promise.resolve(this.actual).then(valueToString);

    // Wrap the assertion in a promise, then convert the result into a boolean.
    const assertPromise = new Promise((resolve) => {
      const assert = testController.expect(this.actual) as Assert<Promise<void>>;

      assert[key as AssertionKeys](...args)
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });

    return Promise.all([actualPromise, assertPromise])
      .then(([actual, isExpected]) => {
        if (isExpected) {
          return log(
            `Assert that value ${actual} ${expectedDescription}`,
            payload,
            'internalAssert',
          );
        }

        throw `Expected that value ${actual} ${expectedDescription}`;
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : String(error);

        throw new E2EDError(message, payload);
      });
  };
}
