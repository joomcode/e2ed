import {MAX_LINES_COUNT_IN_PRINTED_VALUE} from '../../constants/internal';

/**
 * Get lines array trimmed to max lines count in printed value.
 * @internal
 */
export const getLinesArrayTrimmedToMaxLength = (lines: readonly string[]): readonly string[] => {
  if (lines.length <= MAX_LINES_COUNT_IN_PRINTED_VALUE) {
    return lines;
  }

  const halfOfLines = Math.floor(MAX_LINES_COUNT_IN_PRINTED_VALUE / 2);
  const cuttedLinesCount = lines.length - 2 * halfOfLines;

  return [
    ...lines.slice(0, halfOfLines),
    `...(${cuttedLinesCount} lines)...`,
    ...lines.slice(-halfOfLines),
  ];
};
