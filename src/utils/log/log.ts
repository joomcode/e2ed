import {CONSOLE_INSPECT_OPTIONS, e2edEnvironment, LogEventType} from '../../constants/internal';
import {getRunId} from '../../context/runId';

import {assertValueIsDefined} from '../asserts';
// eslint-disable-next-line import/no-internal-modules
import {registerLogEvent} from '../events/registerLogEvent';
import {getFullPackConfig} from '../getFullPackConfig';
import {getUserlandHooks} from '../userlandHooks';
import {valueToString} from '../valueToString';

import {addTestLog} from './testLogs';

import type {Log, LogPayload, UtcTimeInMs} from '../../types/internal';

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log: Log = (message, maybePayload?: unknown, maybeLogEventType?: unknown) => {
  const {getLogContext} = getUserlandHooks();

  const time = Date.now() as UtcTimeInMs;
  const dateTimeInIso = new Date(time).toISOString();
  const runId = getRunId();
  const runLabel = e2edEnvironment.E2ED_RUN_LABEL;
  const payload = typeof maybePayload === 'object' ? (maybePayload as LogPayload) : undefined;
  const type =
    typeof maybePayload === 'number'
      ? (maybePayload as LogEventType)
      : (maybeLogEventType as LogEventType) || LogEventType.Unspecified;
  const context = getLogContext(message, payload, type);

  registerLogEvent(runId, {message, payload, time, type});

  const {printTestLogsInConsole, testLogsFileName} = getFullPackConfig();

  if (printTestLogsInConsole || testLogsFileName) {
    assertValueIsDefined(runLabel, 'runLabel is defined', {message, payload, runId, type});

    const logMessageHead = `[e2ed][${dateTimeInIso}][${runLabel}][${runId}] ${message}`;
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
};
