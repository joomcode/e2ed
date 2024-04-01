const STACK_FRAMES = 'stackFrames: [';

/**
 * Cut verbose lines from printed lines by lines array and start index
 * in this array, and returns next start index.
 * You should repeat this function in a loop until the end of the array.
 * @internal
 */
export const cutVerboseLinesFromPrintedLines = (lines: string[], linesIndex: number): number => {
  const stackFramesLineIndex = lines.findIndex(
    (line, index) => index >= linesIndex && line.includes(STACK_FRAMES),
  );
  const stackFramesLine = lines[stackFramesLineIndex];

  if (stackFramesLine === undefined || stackFramesLine === '') {
    return lines.length;
  }

  const stackFramesIndent = stackFramesLine.slice(0, stackFramesLine.indexOf(STACK_FRAMES));
  const isV8FramesStart = `${stackFramesIndent}isV8Frames: `;

  const isV8FramesLineIndex = lines.findIndex(
    (line, index) =>
      index >= linesIndex && line.startsWith(isV8FramesStart) && line.includes('true'),
  );

  if (isV8FramesLineIndex <= stackFramesLineIndex) {
    return lines.length;
  }

  lines.splice(
    stackFramesLineIndex,
    isV8FramesLineIndex - stackFramesLineIndex,
    `${stackFramesIndent}${STACK_FRAMES}...],`,
  );

  return stackFramesLineIndex + 2;
};
