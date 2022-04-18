import {LogEventType, SCREENSHOT_EVENT_TYPES} from '../constants/internal';
import {getPageLoaded} from '../context/pageLoaded';
import {getRunId} from '../context/runId';
import {testController} from '../testController';

// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from './events/registerLogEvent';
import {getFullConfig} from './getFullConfig';
import {valueToString} from './valueToString';

import type {Log, LogPayload, RunLabel, UtcTimeInMs} from '../types/internal';

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const hooks: typeof import('../hooks') = require('../hooks');

  const {printTestLogsInConsole} = getFullConfig();

  const time = Date.now() as UtcTimeInMs;
  const dateTimeInISO = new Date(time).toISOString();
  const runId = getRunId();
  const runLabel = process.env.E2ED_RUN_LABEL as RunLabel;
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || LogEventType.Unspecified;
  const context = hooks.getLogContext(message, payload, type);

  return registerLogEvent(runId, {message, payload, time, type}).then((numberInRun) => {
    // eslint-disable-next-line sort-keys
    const printedString = valueToString(context ? {payload, context} : {payload});

    if (printTestLogsInConsole) {
      // eslint-disable-next-line no-console
      console.log(`[e2ed][${dateTimeInISO}][${runLabel}][${runId}] ${message} ${printedString}\n`);
    }

    const pageLoaded = getPageLoaded();

    if (pageLoaded && SCREENSHOT_EVENT_TYPES.includes(type)) {
      return testController.takeScreenshot({path: `${runId}/${numberInRun}`}) as Promise<void>;
    }

    return undefined;
  });
};
