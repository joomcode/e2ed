import {getRunId, setRunId} from '../context/runId';
import {logContext} from '../hooks';

import {getLabel} from './getLabel';
import {getRandomId} from './getRandomId';
import {valueToString} from './valueToString';

import type {Log} from '../types/internal';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => Promise.resolve();

const writeLog: Log = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();

  if (getRunId() === undefined) {
    setRunId(getRandomId());
  }

  const runId = getRunId();
  const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
  const context = logContext();
  const printedObject: Record<string, unknown> = {payload, context};

  const printedString = valueToString(printedObject);

  // eslint-disable-next-line no-console
  console.log(
    `[e2ed][${dateTimeInISO}]${maybeRunLabel}[${runId || ''}] ${message} ${printedString}\n`,
  );

  return Promise.resolve();
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_HIDE_LOGS ? noop : writeLog;
