// eslint-disable-next-line no-control-regex
const stylesRegexp = /\x1B\[[\d;]+m/gi;

/**
 * Removes console (terminal) styles from a string (like `\x1B[3m...`).
 */
export const removeStyleFromString = (text: string): string => text.replace(stylesRegexp, '');
