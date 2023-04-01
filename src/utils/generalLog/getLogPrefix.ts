import {e2edEnvironment, RUN_LABEL_VARIABLE_NAME} from '../../constants/internal';

import {getPrintedRunLabel} from '../runLabel';

import type {UtcTimeInMs} from '../../types/internal';

/**
 * Get prefix of log message head.
 * @internal
 */
export const getLogPrefix = (
  prefixEnding = '',
  utcTimeInMs = Date.now() as UtcTimeInMs,
): string => {
  const dateTimeInIso = new Date(utcTimeInMs).toISOString();
  const printedRunLabel = getPrintedRunLabel(e2edEnvironment[RUN_LABEL_VARIABLE_NAME]);

  return `[e2ed][${dateTimeInIso}]${printedRunLabel}${prefixEnding}`;
};
