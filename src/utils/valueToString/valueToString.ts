import {inspect, type InspectOptions} from 'node:util';

import {DEFAULT_INSPECT_OPTIONS, MAX_LINES_COUNT_IN_PRINTED_VALUE} from '../../constants/internal';

import {cutVerboseLinesFromPrintedLines} from './cutVerboseLinesFromPrintedLines';
import {getLinesArrayTrimmedToLength} from './getLinesArrayTrimmedToLength';

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
    return valueAsString;
  }

  for (let linesIndex = 0; linesIndex < lines.length; ) {
    linesIndex = cutVerboseLinesFromPrintedLines(lines, linesIndex);
  }

  const trimmedLines = getLinesArrayTrimmedToLength(lines);

  return trimmedLines.join('\n');
};
