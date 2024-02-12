import type {Fn} from '../../types/internal';

const DEFAULT_MAX_CODE_LENGTH = 300;

/**
 * Get function code with max code length.
 * @internal
 */
export const getFunctionCode = <Args extends readonly unknown[], R>(
  fn: Fn<Args, R>,
  maxCodeLength: number = DEFAULT_MAX_CODE_LENGTH,
): string => {
  const fullFunctionCode = Function.prototype.toString.call(fn);

  if (fullFunctionCode.length <= maxCodeLength) {
    return fullFunctionCode;
  }

  const halfOfMaxLength = Math.floor(maxCodeLength / 2);
  const cuttedSymbolsCount = fullFunctionCode.length - 2 * halfOfMaxLength;

  return [
    fullFunctionCode.slice(0, halfOfMaxLength),
    `...(${cuttedSymbolsCount} symbols)...`,
    fullFunctionCode.slice(-halfOfMaxLength),
  ].join('');
};
