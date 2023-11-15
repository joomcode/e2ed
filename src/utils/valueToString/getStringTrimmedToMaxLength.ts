import {MAX_STRING_LENGTH_IN_PRINTED_VALUE} from '../../constants/internal';

/**
 * Get string trimmed to max string length in printed value.
 * @internal
 */
export const getStringTrimmedToMaxLength = (text: string): string => {
  if (text.length <= MAX_STRING_LENGTH_IN_PRINTED_VALUE) {
    return text;
  }

  const halfOfLength = Math.floor(MAX_STRING_LENGTH_IN_PRINTED_VALUE / 2);
  const numberOfCuttedSymbols = text.length - 2 * halfOfLength;

  return `${text.slice(0, halfOfLength)}...(${numberOfCuttedSymbols} symbols)...${text.slice(
    -halfOfLength,
  )}`;
};
