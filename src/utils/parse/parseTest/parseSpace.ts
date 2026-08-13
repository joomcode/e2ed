/**
 * Parses spaces in source till first non-space symbol.
 * @internal
 */
export const parseSpace = (start: number, source: string): number => {
  let index = start;

  for (; index < source.length; index += 1) {
    const char = source[index];

    if (char !== ' ' && char !== '\n' && char !== '\t' && char !== '\r') {
      return index;
    }
  }

  return -1;
};
