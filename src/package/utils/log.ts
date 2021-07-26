import {getContextLength} from '../context/getContextLength';
import {getRunId, setRunId} from '../context/runId';

import {getRandomId} from './getRandomId';
import {print} from './print';

type Log = (message: string, params?: Record<string, unknown>) => void;

const getLabel = (label: string | undefined): string => (label ? `[${label}]` : '');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => {};

const writeLog: Log = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();

  if (getRunId() === undefined) {
    setRunId(getRandomId());
  }

  const runId = getRunId();
  const contextLength = getContextLength();
  const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
  const printedObject: Record<string, unknown> = {payload, contextLength};

  const printedString = print(printedObject);

  // eslint-disable-next-line no-console
  console.log(
    `[e2ed][${dateTimeInISO}]${maybeRunLabel}[${runId || ''}] ${message} ${printedString}`,
  );
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_SHOW_LOGS ? writeLog : noop;
