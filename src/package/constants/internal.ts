import type {RunId, TestRunEvent} from '../types/internal';

export * from './events';
export * from './fs';
export * from './log';
export * from './paths';
export * from './pixelmatch';
export * from './report';

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

/**
 * Max number of lines in printed stringify values (in logs).
 * @internal
 */
export const MAX_LINES_IN_STRINGIFY_VALUE = 400;

/**
 * Hash object with runId as keys and TestRunEvent as values.
 * @internal
 */
export const RUN_IDS_HASH: Record<RunId, TestRunEvent> = {};
