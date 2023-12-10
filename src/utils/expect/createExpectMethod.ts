import {LogEventStatus, LogEventType, RESOLVED_PROMISE} from '../../constants/internal';
import {testController} from '../../testController';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {getFullPackConfig} from '../getFullPackConfig';
import {log} from '../log';
import {getPromiseWithResolveAndReject} from '../promise';
import {getDescriptionFromSelector} from '../selectors';
import {isReExecutablePromise, isThenable} from '../typeGuards';
import {valueToString, wrapStringForLogs} from '../valueToString';

import type {Selector} from '../../types/internal';

import type {
  AssertionFunction,
  AssertionFunctionKey,
  AssertionFunctionsRecord,
  ExpectMethod,
} from './types';

let assertionTimeout: number | undefined;

/**
 * Creates method of `Expect` class.
 * @internal
 */
export const createExpectMethod = (
  key: AssertionFunctionKey,
  getAssertionMessage: AssertionFunction<string>,
): ExpectMethod =>
  // eslint-disable-next-line no-restricted-syntax
  function method(...args: Parameters<ExpectMethod>) {
    assertionTimeout ??= getFullPackConfig().assertionTimeout;

    const timeout = assertionTimeout + 1_000;
    const message = getAssertionMessage(...args);

    const {clearRejectTimeout, promiseWithTimeout, reject, setRejectTimeoutFunction} =
      getPromiseWithResolveAndReject(timeout);

    setRejectTimeoutFunction(() => {
      const timeoutWithUnits = getDurationWithUnits(timeout);
      const error = new E2edError(
        `"${key}" assertion promise rejected after ${timeoutWithUnits} timeout`,
      );

      reject(error);
    });

    const runAssertion = (value: unknown): Promise<unknown> => {
      const assertion = testController.expect(value) as AssertionFunctionsRecord<Promise<void>>;

      return assertion[key](...args);
    };

    const assertionPromise = RESOLVED_PROMISE.then(() => {
      if (
        isThenable(this.actualValue) &&
        !isReExecutablePromise<unknown>(this.actualValue as Promise<unknown>)
      ) {
        return this.actualValue.then(runAssertion);
      }

      return runAssertion(this.actualValue);
    });

    const assertionPromiseWithTimeout = Promise.race([assertionPromise, promiseWithTimeout]).then(
      () => undefined,
      (error: Error) => error,
    );

    return assertionPromiseWithTimeout.then((maybeError) => {
      const logMessage = `Assert: ${this.description}`;
      const logPayload = {
        assertionArguments: args,
        description: this.actualValue
          ? getDescriptionFromSelector(this.actualValue as Selector)
          : undefined,
        error: maybeError,
        logEventStatus: maybeError ? LogEventStatus.Failed : LogEventStatus.Passed,
      };

      return Promise.race([this.actualValue, promiseWithTimeout])
        .then(
          (actualValue) =>
            log(
              logMessage,
              {
                actualValue,
                assertion: wrapStringForLogs(`value ${valueToString(actualValue)} ${message}`),
                ...logPayload,
              },
              LogEventType.InternalAssert,
            ),
          (actualValueResolveError: Error) => {
            log(logMessage, {actualValueResolveError, ...logPayload}, LogEventType.InternalAssert);
          },
        )
        .then(() => {
          if (maybeError) {
            throw maybeError;
          }
        })
        .finally(clearRejectTimeout);
    });
  };
