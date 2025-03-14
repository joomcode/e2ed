import {assertValueIsDefined} from '../asserts';

const aCodePoint = 97;
// eslint-disable-next-line @typescript-eslint/naming-convention
const ACodePoint = 65;
const nineCodePoint = 57;
const zCodePoint = 122;
// eslint-disable-next-line @typescript-eslint/naming-convention
const ZCodePoint = 90;
const zeroCodePoint = 48;

type Return = Readonly<{
  borderCount: number;
  letterCount: number;
}>;

/**
 * Returns count of border (letter or non-letter) inside string.
 * @internal
 */
// eslint-disable-next-line complexity
export const getBorderCount = (value: string): Return => {
  let borderCount = -1;
  let letterCount = 0;
  let mode: '.' | '0' | 'A' | 'a' | undefined;

  for (const char of value) {
    const codePoint = char.codePointAt(0);

    assertValueIsDefined(codePoint, 'codePoint is defined', {value});

    switch (true) {
      case codePoint >= zeroCodePoint && codePoint <= nineCodePoint:
        if (mode !== '0') {
          borderCount += 1;
        }

        mode = '0';
        break;

      case codePoint >= ACodePoint && codePoint <= ZCodePoint:
        if (mode !== 'A') {
          borderCount += 1;
        }

        letterCount += 1;
        mode = 'A';
        break;

      case codePoint >= aCodePoint && codePoint <= zCodePoint:
        if (mode !== 'a') {
          borderCount += 1;
        }

        letterCount += 1;
        mode = 'a';
        break;

      default:
        if (mode !== '.') {
          borderCount += 1;
        }

        mode = '.';
    }
  }

  return {borderCount, letterCount};
};
