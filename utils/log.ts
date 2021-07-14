import {inspect} from 'util';

import {DEFAULT_INSPECT_OPTIONS} from '../constants';
import {getContextLength, getMeta, setMeta} from '../context';
import {getRandomId} from './getRandomId';

type Log = (message: string, params?: Record<string, unknown>) => void;

const getLabel = (label: string | undefined) => (label ? `[${label}]` : '');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => {};

const writeLog: Log = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();

  if (getMeta().runId === undefined) {
    setMeta({runId: getRandomId()});
  }

  const {runId} = getMeta();
  const contextLength = getContextLength();
  const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
  const printedObject: Record<string, unknown> = {payload, contextLength};

  const printedString = inspect(printedObject, DEFAULT_INSPECT_OPTIONS);

  // eslint-disable-next-line no-console
  console.log(
    `[e2ed][${dateTimeInISO}]${maybeRunLabel}[${runId || ''}] ${message} ${printedString}`,
  );
};

/**
 * Log every actions and API requests in E2ED tests.
 */
export const log = process.env.E2ED_SHOW_LOGS ? writeLog : noop;
