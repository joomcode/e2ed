import {type InspectOptions, inspect} from 'node:util';

import {DEFAULT_INSPECT_OPTIONS, MAX_LINES_IN_STRINGIFY_VALUE} from '../constants/internal';

const STACK_FRAMES = 'stackFrames: [';

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

  const stackFramesLineIndex = lines.findIndex((line) => line.includes(STACK_FRAMES));
  const stackFramesLine = lines[stackFramesLineIndex];
  const isV8FramesLineIndex = lines.findIndex(
    (line) => line.includes('isV8Frames: ') && line.includes('true'),
  );

  if (stackFramesLineIndex > 0 && isV8FramesLineIndex > stackFramesLineIndex && stackFramesLine) {
    const stackFramesIndent = stackFramesLine.slice(0, stackFramesLine.indexOf(STACK_FRAMES));

    lines.splice(
      stackFramesLineIndex,
      isV8FramesLineIndex - stackFramesLineIndex,
      `${stackFramesIndent}${STACK_FRAMES}...],`,
    );
  }

  if (lines.length <= MAX_LINES_IN_STRINGIFY_VALUE) {
    return lines.join('\n');
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
