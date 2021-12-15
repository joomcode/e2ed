import type {RunId, RunTestEvent} from '../types/internal';

export * from './log';
export * from './paths';
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
 * Default options for readFile/readFileSync function from fs.
 */
export const READ_FILE_OPTIONS = {encoding: 'utf8'} as const;

/**
 * Hash object with runId as keys and runTestEvent
 * @internal
 */
export const RUNS_HASH: Record<RunId, RunTestEvent> = {};
