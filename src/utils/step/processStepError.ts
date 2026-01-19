import {LogEventStatus} from '../../constants/internal';

import {E2edError} from '../error';
import {setReadonlyProperty} from '../object';

import type {LogEvent, StepErrorProperties} from '../../types/internal';

type Options = Readonly<{
  error: unknown;
  errorProperties: StepErrorProperties;
  logEvent: LogEvent | undefined;
}>;

/**
 * Processes `step` error.
 * @internal
 */
// eslint-disable-next-line complexity
export const processStepError = ({error, errorProperties, logEvent}: Options): unknown => {
  const message = `Caught an error in step "${errorProperties.stepName}"`;
  let stepError: unknown = error;

  if (
    !(stepError instanceof E2edError) &&
    Object.getOwnPropertySymbols(stepError ?? {}).length > 0
  ) {
    stepError = new E2edError(message, {
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
    stepError = new E2edError(message, {cause: stepError, ...errorProperties});
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

  return stepError;
};
