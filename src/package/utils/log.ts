import {LogEventType} from '../constants/internal';
import {getPageLoaded} from '../context/pageLoaded';
import {getRunId} from '../context/runId';
import {testController} from '../testController';

// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from './events/registerLogEvent';
import {getPrintedLabel} from './getPrintedLabel';
import {valueToString} from './valueToString';

import type {Log, LogPayload, UtcTimeInMs} from '../types/internal';

const resolvedPromise = Promise.resolve();

const noop: Log = () => resolvedPromise;

const writeLog: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../hooks') = require('../hooks');

  const time = Date.now() as UtcTimeInMs;
  const dateTimeInISO = new Date(time).toISOString();
  const runId = getRunId();
  const printedRunLabel = getPrintedLabel(process.env.E2ED_RUN_LABEL);
  const context = hooks.getLogContext();
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || LogEventType.Unspecified;

  return registerLogEvent(runId, {message, payload, time, type}).then((numberInRun) => {
    // eslint-disable-next-line sort-keys
    const printedString = valueToString(context ? {payload, context} : {payload});

    // eslint-disable-next-line no-console
    console.log(
      `[e2ed][${dateTimeInISO}]${printedRunLabel}[${runId}] ${message} ${printedString}\n`,
    );

    const pageLoaded = getPageLoaded();

    if (pageLoaded && (type === LogEventType.Action || type === LogEventType.InternalAssert)) {
      return testController.takeScreenshot({path: `${runId}/${numberInRun}`}) as Promise<void>;
    }

    return undefined;
  });
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_HIDE_LOGS ? noop : writeLog;
