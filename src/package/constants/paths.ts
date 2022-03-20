import {join} from 'path';

import type {DirectoryPathFromRoot} from '../types/internal';

/**
 * Relative (from root) path to installed e2ed package directory.
 * @internal
 */
export const E2ED_PACKAGE_DIRECTORY_PATH = join('node_modules', 'e2ed') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to reports directory.
 * @internal
 */
export const REPORTS_DIRECTORY_PATH = join('e2ed', 'reports') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to directory with all tests.
 * @internal
 */
export const TESTS_DIRECTORY_PATH = join('e2ed', 'tests') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to tmp directory.
 * @internal
 */
export const TMP_DIRECTORY_PATH = join(REPORTS_DIRECTORY_PATH, 'tmp') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to compiled userland config file.
 * @internal
 */
export const COMPILED_USERLAND_CONFIG_PATH = join(TMP_DIRECTORY_PATH, 'config.js');

/**
 * Relative (from root) path to events directory.
 * @internal
 */
export const EVENTS_DIRECTORY_PATH = join(TMP_DIRECTORY_PATH, 'events') as DirectoryPathFromRoot;

/**
 * Path to JSON-report file.
 * @internal
 */
export const JSON_REPORT_PATH = join(
  REPORTS_DIRECTORY_PATH,
  'report.json',
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to userland config file.
 * @internal
 */
export const USERLAND_CONFIG_PATH = join('e2ed', 'config.ts');
