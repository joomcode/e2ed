/* eslint-disable @typescript-eslint/no-non-null-assertion, no-var, vars-on-top */

import type {LineColumn, ParseTestContext} from '../../../types/internal';

/**
 * Get number of line where in which the character with the specified index is located.
 */
const getNumberOfLine = (index: number, linesIndexes: readonly number[]): number => {
  const {length} = linesIndexes;

  if (index >= linesIndexes[length - 1]!) {
    return length - 1;
  }

  var min = 0;
  var max = length - 2;

  while (min < max) {
    // eslint-disable-next-line no-bitwise
    var middle = min + ((max - min) >> 1);

    if (index < linesIndexes[middle]!) {
      max = middle - 1;
    } else if (index >= linesIndexes[middle + 1]!) {
      min = middle + 1;
    } else {
      min = middle;
      break;
    }
  }

  return min;
};

/**
 * Get `LineColumn` string by index in source.
 * @internal
 */
export const getLineColumnByIndex = (
  {lineColumnCache, linesIndexes}: ParseTestContext,
  index: number,
): LineColumn => {
  let lineColumn = lineColumnCache[index];

  if (lineColumn !== undefined) {
    return lineColumn;
  }

  const numberOfLine = getNumberOfLine(index, linesIndexes);
  const line = numberOfLine + 1;
  const column = index - linesIndexes[numberOfLine]! + 1;

  lineColumn = {column, line};
  // eslint-disable-next-line no-param-reassign
  lineColumnCache[index] = lineColumn;

  return lineColumn;
};
