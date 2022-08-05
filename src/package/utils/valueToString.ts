import {type InspectOptions, inspect} from 'node:util';

import {DEFAULT_INSPECT_OPTIONS, MAX_LINES_IN_STRINGIFY_VALUE} from '../constants/internal';

/**
 * Return string representation of arbitrary value.
 */
export const valueToString = (
  value: unknown,
  options: InspectOptions = DEFAULT_INSPECT_OPTIONS,
): string => {
  const valueAsString = inspect(value, options);
  const lines = valueAsString.split('\n');

  if (lines.length <= MAX_LINES_IN_STRINGIFY_VALUE) {
    return valueAsString;
  }

  const halfOfLines = Math.floor(MAX_LINES_IN_STRINGIFY_VALUE / 2);
  const numberOfCuttedLines = lines.length - 2 * halfOfLines;

  const cuttedLines = [
    ...lines.slice(0, halfOfLines),
    `...(${numberOfCuttedLines} lines)...`,
    ...lines.slice(-halfOfLines),
  ];

  return cuttedLines.join('\n');
};
