import {MAX_STRING_LENGTH_IN_PRINTED_VALUE} from '../../constants/internal';

/**
 * Get string trimmed to max string length in printed value.
 */
export const getStringTrimmedToMaxLength = (
  text: string,
  maxStringLength = MAX_STRING_LENGTH_IN_PRINTED_VALUE,
): string => {
  if (text.length <= maxStringLength) {
    return text;
  }

  const halfOfLength = Math.floor(maxStringLength / 2);
  const numberOfCuttedSymbols = text.length - 2 * halfOfLength;

  return `${text.slice(0, halfOfLength)}...(${numberOfCuttedSymbols} symbols)...${text.slice(
    -halfOfLength,
  )}`;
};
