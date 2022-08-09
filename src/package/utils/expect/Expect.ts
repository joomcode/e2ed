import {LogEventType} from '../../constants/internal';
import {testController} from '../../testController';

import {log} from '../log';
import {valueToString} from '../valueToString';

import {assertionMessageGetters} from './assertionMessageGetters';

import type {AssertionFunctionKeys, AssertionFunctions} from './types';

/**
 * testController.expect wrapper with logs.
 * @internal
 */
class Expect {
  constructor(public actualValue: unknown, public description: string) {}

  [key: string]: unknown;
}

for (const [key, getAssertionMessage] of Object.entries(assertionMessageGetters)) {
  Expect.prototype[key] = function method(...args: unknown[]) {
    const message = getAssertionMessage(...args);

    const assertPromise = new Promise<Error | undefined>((resolve) => {
      const assert = testController.expect(this.actualValue) as AssertionFunctions<Promise<void>>;

      assert[key as AssertionFunctionKeys](...args)
        .then(() => resolve(undefined))
        .catch((error: Error) => resolve(error));
    });

    return assertPromise.then((maybeError) =>
      Promise.resolve(this.actualValue)
        .then((actualValue) =>
          log(
            `Assert: ${this.description}`,
            {
              actualValue,
              assertion: `value ${valueToString(actualValue)} ${message}`,
              assertionArguments: args,
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
