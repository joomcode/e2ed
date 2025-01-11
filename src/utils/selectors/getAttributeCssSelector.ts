/**
 * Get CSS selector string for attribute by attribute name and value.
 * @internal
 */
export const getAttributeCssSelector = (name: string, value: string): string =>
  `[${name}="${value}"]`;
