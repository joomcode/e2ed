/**
 * Default options for node util.inspect.
 * @internal
 */
export const DEFAULT_INSPECT_OPTIONS = {
  colors: false,
  depth: 16,
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
 * Max number of lines in printed stringify values (in logs).
 * @internal
 */
export const MAX_LINES_IN_STRINGIFY_VALUE = 300;
