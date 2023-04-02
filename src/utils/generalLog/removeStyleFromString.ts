/**
 * Removes console (terminal) styles from a string (like `\x1B[3m...`).
 */
// eslint-disable-next-line no-control-regex
export const removeStyleFromString = (text: string): string => text.replace(/\x1B\[[^m]+m/gi, '');
