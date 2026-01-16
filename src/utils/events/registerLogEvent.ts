import {setReadonlyProperty} from '../object';
import {getTopStep} from '../step';

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

    const topStep = getTopStep();

    if (topStep !== undefined) {
      if (topStep.children !== undefined) {
        (topStep.children as Mutable<typeof topStep.children>).push(logEvent);
      } else {
        setReadonlyProperty(topStep, 'children', [logEvent]);
      }
    } else {
      (runTestEvent.logEvents as Mutable<typeof runTestEvent.logEvents>).push(logEvent);
    }
  }

  runTestEvent.onlog();

  return logEvent;
};
