import {getPageLoaded} from '../context/pageLoaded';
import {getRunId} from '../context/runId';
import {testController} from '../testController';

import {getPrintedLabel} from './getPrintedLabel';
import {registerLogEvent} from './registerLogEvent';
import {valueToString} from './valueToString';

import type {Log, LogEventType, LogPayload, UtcTimeInMs} from '../types/internal';

const resolvedPromise = Promise.resolve();

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => resolvedPromise;

const writeLog: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../hooks') = require('../hooks');

  const utcTimeInMs = Date.now() as UtcTimeInMs;
  const dateTimeInISO = new Date(utcTimeInMs).toISOString();
  const runId = getRunId();
  const printedRunLabel = getPrintedLabel(process.env.E2ED_RUN_LABEL);
  const context = hooks.logContext();
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'string'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || 'unspecified';

  return registerLogEvent(runId, {
    context,
    message,
    payload,
    type,
    utcTimeInMs,
  }).then((numberInRun) => {
    const printedString = valueToString({payload, context});

    // eslint-disable-next-line no-console
    console.log(
      `[e2ed][${dateTimeInISO}]${printedRunLabel}[${type}][${runId}] ${message} ${printedString}\n`,
    );

    const pageLoaded = getPageLoaded();

    if (pageLoaded && (type === 'action' || type === 'internalAssert')) {
      return testController.takeScreenshot({path: `${runId}/${numberInRun}`}) as Promise<void>;
    }

    return undefined;
  });
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_HIDE_LOGS ? noop : writeLog;
