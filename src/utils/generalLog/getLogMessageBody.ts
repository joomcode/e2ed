import {CONSOLE_INSPECT_OPTIONS, DEFAULT_INSPECT_OPTIONS} from '../../constants/internal';

import {valueToString} from '../valueToString';

import type {LogContext, LogPayload, ValueToStringOptions} from '../../types/internal';

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

  const maxLines = payload == null ? undefined : payload.maxLinesCountInPrintedValue;

  let options: ValueToStringOptions = isLogInConsole
    ? CONSOLE_INSPECT_OPTIONS
    : DEFAULT_INSPECT_OPTIONS;

  if (maxLines !== undefined) {
    options = {...options, maxLines};
  }

  return ` ${valueToString(printedPayload, options)}`;
};
