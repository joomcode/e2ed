import {getStepsStackStorage} from '../../context/stepsStackStorage';
import {getTestIdleTimeout} from '../../context/testIdleTimeout';

import {E2edError} from '../error';
import {getDurationWithUnits} from '../getDurationWithUnits';
import {addTimeoutToPromise} from '../promise';

import type {
  LogEvent,
  LogPayload,
  StepBody,
  StepErrorProperties,
  StepOptions,
  Void,
} from '../../types/internal';

import {test as playwrightTest} from '@playwright/test';

type Options = Readonly<{
  body: StepBody | undefined;
  errorProperties: StepErrorProperties;
  logEvent: LogEvent | undefined;
  name: string;
  stepOptions: StepOptions;
}>;

type Return = Readonly<{
  bodyError: unknown;
  hasError: boolean;
  payload: LogPayload | Void;
}>;

/**
 * Runs `step` body function.
 * @internal
 */
export const runStepBody = async ({
  body,
  errorProperties,
  logEvent,
  name,
  stepOptions,
}: Options): Promise<Return> => {
  let payload = undefined as LogPayload | Void;

  const timeout: number = stepOptions?.timeout ?? getTestIdleTimeout();
  const timeoutError = new E2edError(
    `Body of step "${name}" rejected after ${getDurationWithUnits(timeout)} timeout`,
    errorProperties,
  );

  const runBody = async (): Promise<void> => {
    if (logEvent !== undefined && typeof body === 'function') {
      const stepsStackStorage = getStepsStackStorage();

      payload = await stepsStackStorage.run(logEvent, body);
    } else {
      payload = await body?.();
    }
  };

  let bodyError: unknown;
  let hasError = false;

  const runBodyWithTimeout = (): Promise<void> =>
    addTimeoutToPromise(runBody(), timeout, timeoutError).catch((error: unknown) => {
      bodyError = error;
      hasError = true;
    });

  if (stepOptions?.runPlaywrightStep === true) {
    await playwrightTest.step(name, () => runBodyWithTimeout());
  } else {
    await runBodyWithTimeout();
  }

  return {bodyError, hasError, payload};
};
