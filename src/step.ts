import {LogEventType} from './constants/internal';
import {getTestRunPromise} from './context/testRunPromise';
import {setCustomInspectOnFunction} from './utils/fn';
import {generalLog} from './utils/generalLog';
import {logAndGetLogEvent} from './utils/log';
import {setReadonlyProperty} from './utils/object';
import {processStepError, runStepBody} from './utils/step';

import type {
  LogEvent,
  LogPayload,
  StepBody,
  StepErrorProperties,
  StepOptions,
  UtcTimeInMs,
  Void,
} from './types/internal';

/**
 * Declares a test step (could calls Playwright's `test.step` function inside).
 */
// eslint-disable-next-line max-statements
export const step = async (
  name: string,
  body?: StepBody,
  options: StepOptions = {},
): Promise<void> => {
  if (body !== undefined) {
    setCustomInspectOnFunction(body);
  }

  let logEvent: LogEvent | undefined;

  const errorProperties: StepErrorProperties = {
    stepBody: body,
    stepName: name,
    stepOptions: options,
  };
  let isTestRunCompleted = false;
  let payload = undefined as LogPayload | Void;
  let stepError: unknown;

  try {
    const testRunPromise = getTestRunPromise();

    void testRunPromise.then(() => {
      isTestRunCompleted = true;
    });

    if (options?.skipLogs !== true) {
      logEvent = logAndGetLogEvent(
        name,
        options?.payload,
        options?.type ?? LogEventType.InternalCore,
      );
    }

    const {
      bodyError,
      hasError,
      payload: additionalPayload,
    } = await runStepBody({
      body,
      errorProperties,
      logEvent,
      name,
      stepOptions: options,
    });

    payload = additionalPayload;

    if (hasError) {
      throw bodyError;
    }
  } catch (error) {
    stepError = processStepError({error, errorProperties, logEvent});

    if (isTestRunCompleted) {
      await new Promise(() => {});
    }

    throw stepError;
  } finally {
    if (logEvent !== undefined) {
      const endTime = Date.now() as UtcTimeInMs;

      setReadonlyProperty(logEvent, 'endTime', endTime);

      if (payload !== undefined) {
        setReadonlyProperty(logEvent, 'payload', {...logEvent.payload, ...payload});
      }

      generalLog(`Step "${name}" completed`, {
        body,
        step: {...logEvent, children: logEvent.children?.map(({message}) => message)},
        stepError,
      });
    }
  }
};
