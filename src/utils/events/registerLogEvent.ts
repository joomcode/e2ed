import {getStepsStack} from '../../context/stepsStack';

import {setReadonlyProperty} from '../object';

import {getTestRunEvent} from './getTestRunEvent';

import type {LogEvent, Mutable, RunId} from '../../types/internal';

type LogEventWithMaybeSkippedPayload = Omit<LogEvent, 'payload'> &
  Readonly<{payload: LogEvent['payload'] | 'skipLog'}>;

/**
 * Registers log event (for report).
 * @internal
 */
export const registerLogEvent = (
  runId: RunId,
  logEventWithMaybeSkippedPayload: LogEventWithMaybeSkippedPayload,
): LogEvent | undefined => {
  let logEvent: LogEvent | undefined;
  const runTestEvent = getTestRunEvent(runId);

  if (logEventWithMaybeSkippedPayload.payload !== 'skipLog') {
    logEvent = logEventWithMaybeSkippedPayload as LogEvent;

    const stepsStack = getStepsStack();
    const runningStep = stepsStack.at(-1);

    if (runningStep !== undefined) {
      if (runningStep.children !== undefined) {
        (runningStep.children as Mutable<typeof runningStep.children>).push(logEvent);
      } else {
        setReadonlyProperty(runningStep, 'children', [logEvent]);
      }
    } else {
      (runTestEvent.logEvents as Mutable<typeof runTestEvent.logEvents>).push(logEvent);
    }
  }

  runTestEvent.onlog();

  return logEvent;
};
