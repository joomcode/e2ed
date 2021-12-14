import {join} from 'path';

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
 * Path to JSON-report file.
 * @internal
 */
export const JSON_REPORT_PATH = join(REPORTS_DIRECTORY_PATH, 'report.json');
