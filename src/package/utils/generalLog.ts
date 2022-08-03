import {CONSOLE_INSPECT_OPTIONS} from '../constants/internal';

import {getPrintedRunLabel} from './runLabel';
import {valueToString} from './valueToString';

import type {E2edEnvironment, GeneralLog} from '../types/internal';

/**
 * General (out of test context) log to stdout.
 */
export const generalLog: GeneralLog = (message, payload) => {
  const dateTimeInISO = new Date().toISOString();
  const printedRunLabel = getPrintedRunLabel((process.env as E2edEnvironment).E2ED_RUN_LABEL);

  const printedString =
    payload === undefined ? '' : valueToString(payload, CONSOLE_INSPECT_OPTIONS);

  // eslint-disable-next-line no-console
  console.log(`[e2ed][${dateTimeInISO}]${printedRunLabel} ${message} ${printedString}\n`);
};
