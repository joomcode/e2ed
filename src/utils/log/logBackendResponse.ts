import {LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';
import {getStepsStack} from '../../context/stepsStack';

import {getTestRunEvent} from '../events';

import {addBackendResponseToLogEvent} from './addBackendResponseToLogEvent';
import {log} from './log';

import type {LogEvent, Payload} from '../../types/internal';

/**
 * Logs backend response to last log event.
 * @internal
 */
export const logBackendResponse = (payload: Payload): void => {
  const stepsStack = getStepsStack();
  const runningStep = stepsStack.at(-1);

  let lastLogEvent: LogEvent | undefined;

  if (runningStep !== undefined) {
    if (runningStep.children !== undefined && runningStep.children.length > 0) {
      lastLogEvent = runningStep.children.at(-1);
    } else {
      lastLogEvent = runningStep;
    }
  } else {
    const runId = getRunId();
    const {logEvents} = getTestRunEvent(runId);

    lastLogEvent = logEvents.at(-1);
  }

  if (lastLogEvent !== undefined) {
    addBackendResponseToLogEvent(payload, lastLogEvent);

    return;
  }

  log('Got a backend responses to log', {backendResponses: [payload]}, LogEventType.InternalUtil);
};
