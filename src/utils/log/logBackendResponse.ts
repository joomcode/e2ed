import {BACKEND_RESPONSES_LOG_MESSAGE, LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {getTestRunEvent} from '../events';
import {getTopStep} from '../step';

import {addBackendResponseToLogEvent} from './addBackendResponseToLogEvent';
import {log} from './log';

import type {LogEvent, Payload} from '../../types/internal';

/**
 * Logs backend response to last log event.
 * @internal
 */
export const logBackendResponse = (payload: Payload): void => {
  const topStep = getTopStep();

  let lastLogEvent: LogEvent | undefined;

  if (topStep !== undefined) {
    if (topStep.children !== undefined && topStep.children.length > 0) {
      lastLogEvent = topStep.children.at(-1);
    } else {
      lastLogEvent = topStep;
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

  log(BACKEND_RESPONSES_LOG_MESSAGE, {backendResponses: [payload]}, LogEventType.InternalUtil);
};
