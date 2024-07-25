import {LogEventStatus, LogEventType, RESOLVED_PROMISE, RETRY_KEY} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {log} from '../log';
import {addTimeoutToPromise} from '../promise';
import {getDescriptionFromSelector} from '../selectors';
import {isThenable} from '../typeGuards';
import {valueToString, wrapStringForLogs} from '../valueToString';

import {additionalMatchers} from './additionalMatchers';
import {applyAdditionalMatcher} from './applyAdditionalMatcher';

import type {Fn, Selector, SelectorPropertyRetryData} from '../../types/internal';

import type {Expect} from './Expect';
import type {AssertionFunction, ExpectMethod} from './types';

import {expect} from '@playwright/test';

const additionalAssertionTimeoutInMs = 1_000;
let assertionTimeout: number | undefined;

/**
 * Creates method of `Expect` class.
 * @internal
 */
export const createExpectMethod = (
  key: string,
  getAssertionMessage?: AssertionFunction<string>,
): ExpectMethod =>
  // eslint-disable-next-line no-restricted-syntax
  function method(...args: Parameters<ExpectMethod>) {
    assertionTimeout ??= getFullPackConfig().assertionTimeout;

    const timeout = assertionTimeout + additionalAssertionTimeoutInMs;
    const message = getAssertionMessage === undefined ? key : getAssertionMessage(...args);

    const timeoutWithUnits = getDurationWithUnits(timeout);
    const error = new E2edError(
      `"${key}" assertion promise rejected after ${timeoutWithUnits} timeout`,
    );

    const runAssertion = (value: unknown): Promise<unknown> => {
      const additionalMatcher = additionalMatchers[key as keyof typeof additionalMatchers];

      if (additionalMatcher !== undefined) {
        const ctx: Expect = {
          actualValue: value,
          description: this.description,
        };

        const selectorPropertyRetryData = (
          this.actualValue as {[RETRY_KEY]?: SelectorPropertyRetryData}
        )?.[RETRY_KEY];

        return addTimeoutToPromise(
          applyAdditionalMatcher(
            additionalMatcher as Fn<unknown[], Promise<unknown>>,
            ctx,
            args,
            selectorPropertyRetryData,
          ),
          timeout,
          error,
        );
      }

      const assertion = expect(value) as unknown as Record<string, Fn<unknown[], Promise<unknown>>>;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return addTimeoutToPromise(assertion[key]!(...args), timeout, error);
    };

    const assertionPromise = RESOLVED_PROMISE.then(() => {
      if (isThenable(this.actualValue)) {
        return addTimeoutToPromise(this.actualValue as Promise<unknown>, timeout, error).then(
          runAssertion,
        );
      }

      return runAssertion(this.actualValue);
    }).then(
      () => undefined,
      (assertionError: Error) => assertionError,
    );

    return assertionPromise.then((maybeError) => {
      const logMessage = `Assert: ${this.description}`;
      const logPayload = {
        assertionArguments: args,
        description:
          this.actualValue != null
            ? getDescriptionFromSelector(this.actualValue as Selector)
            : undefined,
        error: maybeError,
        logEventStatus: maybeError ? LogEventStatus.Failed : LogEventStatus.Passed,
      };

      return addTimeoutToPromise(Promise.resolve(this.actualValue), timeout, error)
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
        });
    });
  };
