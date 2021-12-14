import {join} from 'path';

import type {RunId, RunTestEvent} from '../types/internal';

/**
 * Relative (from root) path to reports directory.
 * @internal
 */
const REPORTS_DIRECTORY_PATH = join('e2ed', 'reports');

/**
 * Relative (from root) path to tmp directory.
 * @internal
 */
export const TMP_DIRECTORY_PATH = join(REPORTS_DIRECTORY_PATH, 'tmp');

/**
 * Relative (from root) path to events directory.
 * @internal
 */
export const EVENTS_DIRECTORY_PATH = join(TMP_DIRECTORY_PATH, 'events');

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
 * Path to JSON-report file.
 * @internal
 */
export const JSON_REPORT_PATH = join(REPORTS_DIRECTORY_PATH, 'report.json');

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
 * Hash object with runId as keys and runTestEvent
 * @internal
 */
export const RUNS_HASH: Record<RunId, RunTestEvent> = {};
