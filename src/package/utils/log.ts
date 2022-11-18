import {CONSOLE_INSPECT_OPTIONS, LogEventType} from '../constants/internal';
import {getRunId} from '../context/runId';

// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from './events/registerLogEvent';
import {assertValueIsDefined} from './asserts';
import {getFullConfig} from './getFullConfig';
import {addTestLog} from './testLogs';
import {valueToString} from './valueToString';

import type {E2edEnvironment, Log, LogPayload, UtcTimeInMs} from '../types/internal';

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const hooks = require<typeof import('../hooks')>('../hooks');

  const time = Date.now() as UtcTimeInMs;
  const dateTimeInISO = new Date(time).toISOString();
  const runId = getRunId();
  const runLabel = (process.env as E2edEnvironment).E2ED_RUN_LABEL;
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || LogEventType.Unspecified;
  const context = hooks.getLogContext(message, payload, type);

  return registerLogEvent(runId, {message, payload, time, type}).then((numberInRun) => {
    const {printTestLogsInConsole, testLogsFileName} = getFullConfig();

    if (printTestLogsInConsole || testLogsFileName) {
      assertValueIsDefined(runLabel, 'runLabel is defined', {
        message,
        numberInRun,
        payload,
        runId,
        time,
        type,
      });

      const logMessageHead = `[e2ed][${dateTimeInISO}][${runLabel}][${runId}] ${message}`;
      // eslint-disable-next-line sort-keys
      const printedValue = context ? {payload, context} : {payload};

      if (printTestLogsInConsole) {
        const printedString = valueToString(printedValue, CONSOLE_INSPECT_OPTIONS);

        // eslint-disable-next-line no-console
        console.log(`${logMessageHead} ${printedString}\n`);
      }

      if (testLogsFileName) {
        const printedString = valueToString(printedValue);

        addTestLog(`${logMessageHead} ${printedString}\n`);
      }
    }

    return undefined;
  });
};
