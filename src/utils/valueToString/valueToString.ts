import {inspect, type InspectOptions} from 'node:util';

import {DEFAULT_INSPECT_OPTIONS, MAX_LINES_COUNT_IN_PRINTED_VALUE} from '../../constants/internal';

import {cutVerboseLinesFromPrintedLines} from './cutVerboseLinesFromPrintedLines';
import {getLinesArrayTrimmedToMaxLength} from './getLinesArrayTrimmedToMaxLength';
import {getStringTrimmedToMaxLength} from './getStringTrimmedToMaxLength';

/**
 * Returns string presentation of arbitrary value.
 */
export const valueToString = (
  value: unknown,
  options: InspectOptions = DEFAULT_INSPECT_OPTIONS,
): string => {
  const valueAsString = inspect(value, options);
  const lines = valueAsString.split('\n');

  if (lines.length <= MAX_LINES_COUNT_IN_PRINTED_VALUE) {
    return getStringTrimmedToMaxLength(valueAsString);
  }

  for (let linesIndex = 0; linesIndex < lines.length; ) {
    linesIndex = cutVerboseLinesFromPrintedLines(lines, linesIndex);
  }

  const trimmedLines = getLinesArrayTrimmedToMaxLength(lines);

  return getStringTrimmedToMaxLength(trimmedLines.join('\n'));
};
