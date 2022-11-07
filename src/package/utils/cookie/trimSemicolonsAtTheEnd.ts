const trimSemicolonsAtTheEndRegexp = /[\s;]+$/g;

/**
 * Trims semicolons and whitespace from the end of the string (for cookie values).
 */
export const trimSemicolonsAtTheEnd = (value: string): string =>
  value.replace(trimSemicolonsAtTheEndRegexp, '');
