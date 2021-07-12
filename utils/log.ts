import {inspect} from 'util';

import {DEFAULT_INSPECT_OPTIONS} from '../constants';
import {context} from './context';
import {getMoscowDateTime} from './getMoscowDateTime';
import {getRandomId} from './getRandomId';

type Log = (message: string, params?: Record<string, unknown>) => void;

const getLabel = (label: string | undefined) => (label ? `[${label}]` : '');
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Log = () => {};

const writeLog: Log = (message, payload) => {
  const moscowDateTime = getMoscowDateTime();

  if (context.getMeta().runId === undefined) {
    context.setMeta({runId: getRandomId()});
  }

  const {runId} = context.getMeta();
  const fullContext = context.getFullContext();
  const contextKeys = Object.keys(fullContext).filter((key) => fullContext[key]);
  const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);
  const printedObject: Record<string, unknown> = {payload, contextKeys};

  if (fullContext.user) {
    printedObject.userEmail = fullContext.user.email;
  }

  const printedString = inspect(printedObject, DEFAULT_INSPECT_OPTIONS);

  // eslint-disable-next-line no-console
  console.log(`[e2e][${moscowDateTime}]${maybeRunLabel}[${runId}] ${message} ${printedString}`);
};

/**
 * Log every actions and API requests in E2E tests.
 */
export const log = process.env.E2ED_SHOW_LOGS ? writeLog : noop;
