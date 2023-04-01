import {CONSOLE_INSPECT_OPTIONS} from '../../constants/internal';

import {valueToString} from '../valueToString';

import type {LogContext, LogPayload} from '../../types/internal';

/**
 * Get body of log message by context, isLogInConsole flag and log payload.
 * @internal
 */
export const getLogMessageBody = (
  context: LogContext | undefined,
  isLogInConsole: boolean,
  payload: LogPayload | undefined,
): string => {
  const printedPayload =
    context && payload && !('context' in payload) ? {...payload, context} : payload;

  if (printedPayload === undefined) {
    return '';
  }

  return ` ${valueToString(printedPayload, isLogInConsole ? CONSOLE_INSPECT_OPTIONS : undefined)}`;
};
