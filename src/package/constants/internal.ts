/**
 * Default options for node util.inspect.
 * @internal
 */
export const DEFAULT_INSPECT_OPTIONS = {
  colors: true,
  depth: 16,
  showHidden: true,
} as const;

/**
 * Key for string locators in createSelector.
 * @internal
 */
export const LOCATOR_KEY = Symbol('Key for string locators in createSelector');
