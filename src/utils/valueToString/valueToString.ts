import {inspect} from 'node:util';

import {
  DEFAULT_INSPECT_OPTIONS,
  DEFAULT_MAX_LINES_COUNT_IN_PRINTED_VALUE,
} from '../../constants/internal';

import {cutVerboseLinesFromPrintedLines} from './cutVerboseLinesFromPrintedLines';
import {getLinesArrayTrimmedToMaxLength} from './getLinesArrayTrimmedToMaxLength';
import {getStringTrimmedToMaxLength} from './getStringTrimmedToMaxLength';

import type {ValueToStringOptions} from '../../types/internal';

/**
 * Returns string presentation of arbitrary value.
 */
export const valueToString = (
  value: unknown,
  options: ValueToStringOptions = DEFAULT_INSPECT_OPTIONS,
): string => {
  const maxLines = options.maxLines ?? DEFAULT_MAX_LINES_COUNT_IN_PRINTED_VALUE;

  if (value instanceof Error) {
    for (const symbol of Object.getOwnPropertySymbols(value)) {
      // We remove symbol fields from Playwright error objects, since printing them creates gigantic logs.
      // @ts-expect-error: cannot set symbol to Error
      // eslint-disable-next-line no-param-reassign
      value[symbol] = {};
    }
  }

  const valueAsString = inspect(value, options);
  const lines = valueAsString.split('\n');

  if (lines.length <= maxLines) {
    return getStringTrimmedToMaxLength(valueAsString);
  }

  for (let linesIndex = 0; linesIndex < lines.length; ) {
    linesIndex = cutVerboseLinesFromPrintedLines(lines, linesIndex);
  }

  const trimmedLines = getLinesArrayTrimmedToMaxLength(lines);

  return getStringTrimmedToMaxLength(trimmedLines.join('\n'));
};
