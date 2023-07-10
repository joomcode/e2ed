import {LogEventStatus, LogEventType} from '../../constants/internal';
import {testController} from '../../testController';

import {log} from '../log';
import {valueToString, wrapStringForLogs} from '../valueToString';

import {assertionMessageGetters} from './assertionMessageGetters';

import type {AssertionFunctionKeys, AssertionFunctions} from './types';

/**
 * testController.expect wrapper with logs.
 * @internal
 */
class Expect {
  constructor(
    readonly actualValue: unknown,
    readonly description: string,
  ) {}

  [key: string]: unknown;
}

for (const [key, getAssertionMessage] of Object.entries(assertionMessageGetters)) {
  // eslint-disable-next-line no-restricted-syntax
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
              assertion: wrapStringForLogs(`value ${valueToString(actualValue)} ${message}`),
              assertionArguments: args,
              error: maybeError,
              logEventStatus: maybeError ? LogEventStatus.Failed : LogEventStatus.Passed,
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

/** @internal */
export {Expect};
