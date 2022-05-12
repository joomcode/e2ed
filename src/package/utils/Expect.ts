import {LogEventType} from '../constants/internal';
import {testController} from '../testController';

import {log} from './log';
import {valueToString} from './valueToString';

import type {Inner} from 'testcafe-without-typecheck';

type AssertionKeys = keyof Inner.Assertion;

type Assert<T> = Record<AssertionKeys, (...args: unknown[]) => T>;

const assertions: Assert<string> = {
  contains: (expected) => `contains ${valueToString(expected)}`,
  eql: (expected) => `is deeply equal to ${valueToString(expected)}`,
  gt: (expected) => `is strictly greater than ${valueToString(expected)}`,
  gte: (expected) => `is greater than or equal to ${valueToString(expected)}`,
  lt: (expected) => `is less than ${valueToString(expected)}`,
  lte: (expected) => `is less than or equal to ${valueToString(expected)}`,
  match: (re) => `matches the regular expression ${valueToString(re)}`,
  notContains: (unexpected) => `not contains ${valueToString(unexpected)}`,
  notEql: (expected) => `is not deeply equal to ${valueToString(expected)}`,
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

/**
 * testController.expect wrapper with logs.
 * @internal
 */
class Expect {
  constructor(public actual: unknown, public description: string) {}

  [key: string]: unknown;
}

for (const [key, getAssertionMessage] of Object.entries(assertions)) {
  Expect.prototype[key] = function method(...args: unknown[]) {
    const message = getAssertionMessage(...args);

    const assertPromise = new Promise<Error | undefined>((resolve) => {
      const assert = testController.expect(this.actual) as Assert<Promise<void>>;

      assert[key as AssertionKeys](...args)
        .then(() => resolve(undefined))
        .catch((error: Error) => resolve(error));
    });

    return assertPromise.then((maybeError) =>
      Promise.resolve(this.actual)
        .then((actual) =>
          log(
            `Assert: ${this.description}`,
            {
              assertion: `value ${valueToString(actual)} ${message}`,
              error: maybeError,
            },
            LogEventType.InternalAssert,
          ),
        )
        .then(() => {
          if (maybeError) {
            throw maybeError;
          }
        }),
    );
  };
}

export {Expect};
