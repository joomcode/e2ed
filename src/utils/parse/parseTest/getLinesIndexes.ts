/**
 * Get array of indexes of lines first symbols in source.
 */
export const getLinesIndexes = (source: string): readonly number[] => {
  let index = 0;
  const lines = source.split('\n');
  const indexes = new Array<number>(lines.length);

  let lineNumber = 0;

  for (; lineNumber < lines.length; lineNumber += 1) {
    indexes[lineNumber] = index;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    index += lines[lineNumber]!.length + 1;
  }

  return indexes;
};
