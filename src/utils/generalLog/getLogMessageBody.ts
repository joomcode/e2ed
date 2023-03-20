import {CONSOLE_INSPECT_OPTIONS} from '../../constants/internal';

import {valueToString} from '../valueToString';

import type {LogContext, LogPayload} from '../../types/internal';

/**
 * General (out of test context) log to stdout.
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
