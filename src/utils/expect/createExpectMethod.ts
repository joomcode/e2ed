import {LogEventStatus, LogEventType, RESOLVED_PROMISE, RETRY_KEY} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {log} from '../log';
import {addTimeoutToPromise} from '../promise';
import {Selector} from '../selectors';
import {setReadonlyProperty} from '../setReadonlyProperty';
import {isThenable} from '../typeGuards';
import {removeStyleFromString, valueToString, wrapStringForLogs} from '../valueToString';

import {additionalMatchers} from './additionalMatchers';
import {applyAdditionalMatcher} from './applyAdditionalMatcher';

import type {Fn, SelectorPropertyRetryData} from '../../types/internal';

import type {Expect} from './Expect';
import type {AssertionFunction, ExpectMethod} from './types';

import {expect} from '@playwright/test';

const additionalAssertionTimeoutInMs = 1_000;

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
    const {assertionTimeout} = getFullPackConfig();

    const timeout = assertionTimeout + additionalAssertionTimeoutInMs;
    const message = getAssertionMessage === undefined ? key : getAssertionMessage(...args);

    const selectorPropertyRetryData = (
      this.actualValue as {[RETRY_KEY]?: SelectorPropertyRetryData}
    )?.[RETRY_KEY];
    const timeoutWithUnits = getDurationWithUnits(timeout);
    const timeoutError = new E2edError(
      `"${key}" assertion promise rejected after ${timeoutWithUnits} timeout`,
    );

    const runAssertion = (value: unknown): Promise<Expect> => {
      const additionalMatcher = additionalMatchers[key as keyof typeof additionalMatchers];
      const ctx: Expect = {actualValue: value, description: this.description};

      if (additionalMatcher !== undefined) {
        return addTimeoutToPromise(
          applyAdditionalMatcher(
            additionalMatcher as Fn<unknown[], Promise<unknown>>,
            ctx,
            args,
            selectorPropertyRetryData,
          ),
          timeout,
          timeoutError,
        ).catch((assertError: Error) => {
          setReadonlyProperty(ctx, 'error', assertError);

          return ctx;
        });
      }

      const assertion = expect(value, ctx.description) as unknown as Record<
        string,
        Fn<unknown[], Promise<unknown>>
      >;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return addTimeoutToPromise(assertion[key]!(...args), timeout, timeoutError).then(
        () => ctx,
        (assertError: Error) => {
          setReadonlyProperty(ctx, 'error', assertError);

          return ctx;
        },
      );
    };

    const assertionPromise: Promise<Expect> = RESOLVED_PROMISE.then(() => {
      if (isThenable(this.actualValue)) {
        return addTimeoutToPromise(
          this.actualValue as Promise<unknown>,
          timeout,
          timeoutError,
        ).then(runAssertion);
      }

      return runAssertion(this.actualValue);
    });

    return assertionPromise.then(({actualValue, additionalLogFields, error}) => {
      const logMessage = `Assert: ${this.description}`;
      const logPayload = {
        assertionArguments: args,
        ...additionalLogFields,
        error: error?.message === undefined ? undefined : removeStyleFromString(error.message),
        logEventStatus: error ? LogEventStatus.Failed : LogEventStatus.Passed,
        selector:
          selectorPropertyRetryData?.selector.description ??
          (this.actualValue instanceof Selector ? this.actualValue.description : undefined),
        ...(selectorPropertyRetryData
          ? {
              selectorProperty: selectorPropertyRetryData.property,
              selectorPropertyArgs: selectorPropertyRetryData.args,
            }
          : undefined),
      };

      return addTimeoutToPromise(Promise.resolve(actualValue), timeout, timeoutError)
        .then(
          (value) =>
            log(
              logMessage,
              {
                actualValue: value,
                assertion: wrapStringForLogs(`value ${valueToString(value)} ${message}`),
                ...logPayload,
              },
              LogEventType.InternalAssert,
            ),
          (actualValueResolveError: Error) => {
            log(logMessage, {actualValueResolveError, ...logPayload}, LogEventType.InternalAssert);
          },
        )
        .then(() => {
          if (error) {
            throw error;
          }
        });
    });
  };
