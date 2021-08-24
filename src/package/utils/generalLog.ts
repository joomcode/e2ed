import {getLabel} from './getLabel';
import {valueToString} from './valueToString';

import type {Log} from '../types/internal';

/**
 * General (out of test context) log to stdout.
 */
export const generalLog: Log = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();
  const maybeRunLabel = getLabel(process.env.E2ED_RUN_LABEL);

  const printedString = payload === undefined ? '' : valueToString(payload);

  // eslint-disable-next-line no-console
  console.log(`[e2ed][${dateTimeInISO}]${maybeRunLabel} ${message} ${printedString}\n`);
};
