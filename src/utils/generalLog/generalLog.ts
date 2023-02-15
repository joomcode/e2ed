import {
  CONSOLE_INSPECT_OPTIONS,
  e2edEnvironment,
  RUN_LABEL_VARIABLE_NAME,
} from '../../constants/internal';

import {getPrintedRunLabel} from '../runLabel';
import {valueToString} from '../valueToString';

import type {GeneralLog} from '../../types/internal';

/**
 * General (out of test context) log to stdout.
 * @internal
 */
export const generalLog: GeneralLog = (message, payload) => {
  const dateTimeInIso = new Date().toISOString();
  const printedRunLabel = getPrintedRunLabel(e2edEnvironment[RUN_LABEL_VARIABLE_NAME]);

  const printedString =
    payload === undefined ? '' : valueToString(payload, CONSOLE_INSPECT_OPTIONS);

  // eslint-disable-next-line no-console
  console.log(`[e2ed][${dateTimeInIso}]${printedRunLabel} ${message} ${printedString}\n`);
};
