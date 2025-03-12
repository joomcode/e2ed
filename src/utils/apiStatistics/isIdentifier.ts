import {getBorderCount} from './getBorderCount';

const maxBorderCountOfNonIdentifier = 6;
const minIdentifierLength = 6;
const maxIdentifierLengthForMaxBorder = 12;

/**
 * Returns `true`, is `value` is identifier, like `67ca3bc9fa30bbcd46dd6f40`.
 * @internal
 */
export const isIdentifier = (value: string): boolean => {
  if (value.length < minIdentifierLength) {
    return false;
  }

  const borderCount = getBorderCount(value);

  if (borderCount > maxBorderCountOfNonIdentifier) {
    return true;
  }

  if (
    borderCount === maxBorderCountOfNonIdentifier &&
    value.length <= maxIdentifierLengthForMaxBorder
  ) {
    return true;
  }

  if (
    borderCount === maxBorderCountOfNonIdentifier - 1 &&
    value.length <= maxIdentifierLengthForMaxBorder - 2
  ) {
    return true;
  }

  if (/^[0-9]+$/.test(value)) {
    return true;
  }

  return false;
};
