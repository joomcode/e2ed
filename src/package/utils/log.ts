import {getRunId} from '../context/runId';
import {logContext} from '../hooks';
import {testController} from '../testController';

import {getKeysCounter} from './getKeysCounter';
import {getPrintedLabel} from './getPrintedLabel';
import {registerLogEvent} from './registerLogEvent';
import {valueToString} from './valueToString';

import type {Log, LogEventType, LogPayload} from '../types/internal';

const resolvedPromise = Promise.resolve();

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => resolvedPromise;

const numberInRunCounter = getKeysCounter();

const writeLog: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  const time = new Date().getTime();
  const dateTimeInISO = new Date(time).toISOString();
  const runId = getRunId();
  const runLabel = process.env.E2ED_RUN_LABEL;
  const printedRunLabel = getPrintedLabel(runLabel);
  const context = logContext();
  const numberInRun = numberInRunCounter(runId);
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'string'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || 'unspecified';

  return registerLogEvent({
    context,
    message,
    numberInRun,
    payload,
    runId,
    runLabel,
    time,
    type,
  }).then(() => {
    const printedString = valueToString({payload, context});

    // eslint-disable-next-line no-console
    console.log(
      `[e2ed][${dateTimeInISO}]${printedRunLabel}[${type}][${runId}] ${message} ${printedString}\n`,
    );

    return testController.takeScreenshot({path: `${runId}/${numberInRun}`}) as Promise<void>;
  });
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_HIDE_LOGS ? noop : writeLog;
