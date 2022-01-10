import {getPrintedRunLabel} from './runLabel';
import {valueToString} from './valueToString';

import type {GeneralLog} from '../types/internal';

/**
 * General (out of test context) log to stdout.
 */
export const generalLog: GeneralLog = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();
  const printedRunLabel = getPrintedRunLabel(process.env.E2ED_RUN_LABEL);

  const printedString = payload === undefined ? '' : valueToString(payload);

  // eslint-disable-next-line no-console
  console.log(`[e2ed][${dateTimeInISO}]${printedRunLabel} ${message} ${printedString}\n`);
};
