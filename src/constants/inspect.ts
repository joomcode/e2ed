/**
 * Default options for node util.inspect.
 * @internal
 */
export const DEFAULT_INSPECT_OPTIONS = {
  colors: false,
  depth: 16,
  numericSeparator: true,
  showHidden: true,
} as const;

/**
 * Inspect options for output to console.
 * @internal
 */
export const CONSOLE_INSPECT_OPTIONS = {
  ...DEFAULT_INSPECT_OPTIONS,
  colors: true,
} as const;

/**
 * Maximum count of elements in printed array.
 * @internal
 */
export const MAX_ELEMENTS_COUNT_IN_PRINTED_ARRAY = 8;

/**
 * Max number of lines in printed stringify values (in logs).
 * @internal
 */
export const MAX_LINES_COUNT_IN_PRINTED_VALUE = 250;
