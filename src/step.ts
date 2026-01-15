/* eslint-disable max-lines */

import {LogEventStatus, LogEventType} from './constants/internal';
import {getStepsStack} from './context/stepsStack';
import {getTestIdleTimeout} from './context/testIdleTimeout';
import {E2edError} from './utils/error';
import {setCustomInspectOnFunction} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {getDurationWithUnits} from './utils/getDurationWithUnits';
import {logAndGetLogEvent} from './utils/log';
import {setReadonlyProperty} from './utils/object';
import {addTimeoutToPromise} from './utils/promise';

import type {
  LogEvent,
  LogPayload,
  MaybePromise,
  Mutable,
  UtcTimeInMs,
  Void,
} from './types/internal';

import {test as playwrightTest} from '@playwright/test';

type Options = Readonly<{
  payload?: LogPayload;
  runPlaywrightStep?: boolean;
  skipLogs?: boolean;
  timeout?: number;
  type?: LogEventType;
}>;

/**
 * Declares a test step (could calls Playwright's `test.step` function inside).
 */
// eslint-disable-next-line complexity, max-statements, max-lines-per-function
export const step = async (
  name: string,
  body?: () => MaybePromise<LogPayload | Void>,
  options?: Options,
): Promise<void> => {
  if (body !== undefined) {
    setCustomInspectOnFunction(body);
  }

  let logEvent: LogEvent | undefined;
  const stepsStack = getStepsStack();
  const timeout: number = options?.timeout ?? getTestIdleTimeout();

  if (options?.skipLogs !== true) {
    logEvent = logAndGetLogEvent(
      name,
      options?.payload,
      options?.type ?? LogEventType.InternalCore,
    );
  }

  if (logEvent !== undefined) {
    (stepsStack as Mutable<typeof stepsStack>).push(logEvent);
  }

  const errorProperties = {stepBody: body, stepName: name, stepOptions: options};
  let payload = undefined as LogPayload | Void;
  let stepError: unknown;

  try {
    const timeoutError = new E2edError(
      `Body of step "${name}" rejected after ${getDurationWithUnits(timeout)} timeout`,
      errorProperties,
    );

    const runBody = async (): Promise<void> => {
      payload = await body?.();
    };

    let bodyError: unknown;
    let hasError = false;

    const runBodyWithTimeout = (): Promise<void> =>
      addTimeoutToPromise(runBody(), timeout, timeoutError).catch((error: unknown) => {
        bodyError = error;
        hasError = true;
      });

    if (options?.runPlaywrightStep === true) {
      await playwrightTest.step(name, () => runBodyWithTimeout());
    } else {
      await runBodyWithTimeout();
    }

    if (hasError) {
      throw bodyError;
    }
  } catch (error) {
    stepError = error;

    if (
      !(stepError instanceof E2edError) &&
      Object.getOwnPropertySymbols(stepError ?? {}).length > 0
    ) {
      stepError = new E2edError('Caught an error in step', {
        cause: String(stepError),
        ...errorProperties,
      });
    }

    if (stepError !== null && (typeof stepError === 'object' || typeof stepError === 'function')) {
      if (!('stepName' in stepError)) {
        Object.assign(
          stepError,
          errorProperties,
          'message' in stepError ? {originalMessage: stepError.message} : undefined,
        );
      }
    } else {
      stepError = new E2edError('Caught an error in step', {cause: stepError, ...errorProperties});
    }

    if (logEvent !== undefined) {
      if (logEvent.payload !== undefined) {
        setReadonlyProperty(logEvent.payload, 'error', stepError);
        setReadonlyProperty(logEvent.payload, 'logEventStatus', LogEventStatus.Failed);
      } else {
        setReadonlyProperty(logEvent, 'payload', {
          error: stepError,
          logEventStatus: LogEventStatus.Failed,
        });
      }
    }

    throw stepError;
  } finally {
    if (logEvent !== undefined) {
      const endTime = Date.now() as UtcTimeInMs;

      setReadonlyProperty(logEvent, 'endTime', endTime);

      if (payload !== undefined) {
        setReadonlyProperty(logEvent, 'payload', {...logEvent.payload, ...payload});
      }

      const logEventIndex = stepsStack.findIndex((event) => event === logEvent);

      if (logEventIndex === -1) {
        // eslint-disable-next-line no-unsafe-finally
        throw new E2edError('Cannot find running step in test steps stack', {
          runningStep: logEvent,
          stepBody: body,
          stepError,
          stepOptions: options,
        });
      }

      (stepsStack as Mutable<typeof stepsStack>).splice(logEventIndex, 1);

      generalLog(`Step "${name}" completed`, {
        body,
        step: {...logEvent, children: logEvent.children?.map(({message}) => message)},
        stepError,
      });
    }
  }
};
