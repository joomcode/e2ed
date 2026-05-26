import {DEFAULT_MAX_LINES_COUNT_IN_PRINTED_VALUE} from '../../constants/internal';

const additionalLinesForRepeatedTrimmerRuns = 4;

/**
 * Get lines array trimmed to max lines count in printed value.
 * @internal
 */
export const getLinesArrayTrimmedToMaxLength = (
  lines: readonly string[],
  maxLines = DEFAULT_MAX_LINES_COUNT_IN_PRINTED_VALUE,
): readonly string[] => {
  if (lines.length <= maxLines + additionalLinesForRepeatedTrimmerRuns) {
    return lines;
  }

  const halfOfLines = Math.floor(maxLines / 2);
  const cuttedLinesCount = lines.length - 2 * halfOfLines;

  return [
    ...lines.slice(0, halfOfLines),
    `...(${cuttedLinesCount} lines)...`,
    ...lines.slice(-halfOfLines),
  ];
};
