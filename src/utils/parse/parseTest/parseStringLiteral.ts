/**
 * Parses string literal, from opening quote character.
 * @internal
 */
export const parseStringLiteral = (
  quoteCharacter: '"' | '`' | "'",
  sourceWithString: string,
): Readonly<{index: number; text: string}> => {
  let hasBackslash = false;
  let index = 1;

  for (; index < sourceWithString.length; index += 1) {
    const char = sourceWithString[index];

    if (char === '\\') {
      index += 1;
      hasBackslash = true;

      continue;
    }

    if (char === quoteCharacter) {
      break;
    }
  }

  if (index >= sourceWithString.length) {
    return {index: -1, text: ''};
  }

  let text = sourceWithString.slice(1, index);

  if (hasBackslash) {
    text = text.replace(/\\(.)/gs, '$1');
  }

  return {index, text};
};
