import {LogEventStatus, LogEventType, RETRY_KEY} from '../../constants/internal';

import {assertValueIsDefined} from '../asserts';
import {getFullPackConfig} from '../config';
import {E2edError} from '../error';
import {generalLog} from '../generalLog';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {logAndGetLogEvent} from '../log';
import {setReadonlyProperty} from '../object';
import {addTimeoutToPromise} from '../promise';
import {Selector} from '../selectors';
import {isThenable} from '../typeGuards';
import {removeStyleFromString, valueToString, wrapStringForLogs} from '../valueToString';

import {getAssertionPromise} from './getAssertionPromise';

import type {SelectorPropertyRetryData, UtcTimeInMs} from '../../types/internal';

import type {additionalMatchers} from './additionalMatchers';
import type {AssertionFunction, ExpectMethod} from './types';

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
    const assertionMessage = getAssertionMessage === undefined ? key : getAssertionMessage(...args);
    const message = `Assert: ${this.description}`;

    const selectorPropertyRetryData = (
      this.actualValue as {[RETRY_KEY]?: SelectorPropertyRetryData}
    )?.[RETRY_KEY];

    const printedValue = isThenable(this.actualValue) ? '<Thenable>' : this.actualValue;
    const logEvent = logAndGetLogEvent(
      message,
      {
        actualValue: printedValue,
        assertion: wrapStringForLogs(`value ${valueToString(printedValue)} ${assertionMessage}`),
        assertionArguments: args,
        selector:
          selectorPropertyRetryData?.selector.description ??
          (this.actualValue instanceof Selector ? this.actualValue.description : undefined),
        ...(selectorPropertyRetryData
          ? {
              selectorProperty: selectorPropertyRetryData.property,
              selectorPropertyArgs: selectorPropertyRetryData.args,
            }
          : undefined),
      },
      LogEventType.InternalAssert,
    );

    assertValueIsDefined(logEvent, 'logEvent is defined', {args, message, ...this});

    const {payload} = logEvent;

    assertValueIsDefined(payload, 'payload is defined', {args, message, ...this});

    const timeoutError = new E2edError(
      `"${key}" assertion promise rejected after ${getDurationWithUnits(timeout)} timeout`,
    );

    const assertionPromise = getAssertionPromise({
      args,
      context: this,
      key: key as keyof typeof additionalMatchers,
      selectorPropertyRetryData,
      timeout,
      timeoutError,
    });

    return assertionPromise.then(({actualValue, additionalLogFields, error}) => {
      const additionalPayload = {
        ...additionalLogFields,
        error: error?.message === undefined ? undefined : removeStyleFromString(error.message),
        logEventStatus: error ? LogEventStatus.Failed : LogEventStatus.Passed,
      };

      Object.assign(payload, additionalPayload);

      return addTimeoutToPromise(Promise.resolve(actualValue), timeout, timeoutError)
        .then(
          (value) => {
            Object.assign(
              payload,
              Object.assign(additionalPayload, {
                actualValue: value,
                assertion: wrapStringForLogs(`value ${valueToString(value)} ${assertionMessage}`),
              }),
            );

            setReadonlyProperty(logEvent, 'endTime', Date.now() as UtcTimeInMs);
          },
          (actualValueResolveError: Error) => {
            Object.assign(payload, Object.assign(additionalPayload, {actualValueResolveError}));

            setReadonlyProperty(logEvent, 'endTime', Date.now() as UtcTimeInMs);
          },
        )
        .then(() => {
          generalLog(`Assert "${this.description}" completed`, additionalPayload);

          if (error) {
            throw error;
          }
        });
    });
  };
