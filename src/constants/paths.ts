import {join, relative} from 'node:path';

import type {
  AbsolutePathToDirectory,
  DirectoryPathFromRoot,
  FilePathFromRoot,
} from '../types/internal';

/**
 * Absolute path to the directory with installed e2ed package (usually in node_modules).
 * @internal
 */
export const ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY = join(
  __dirname,
  '..',
) as AbsolutePathToDirectory;

/**
 * Absolute path to the project root directory.
 * @internal
 */
export const ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY = process.cwd() as AbsolutePathToDirectory;

/**
 * Relative (from root) path to installed e2ed package directory.
 * @internal
 */
export const INSTALLED_E2ED_DIRECTORY_PATH = relative(
  ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY,
  ABSOLUTE_PATH_TO_INSTALLED_E2ED_DIRECTORY,
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to directory with autotests.
 * @internal
 */
export const AUTOTESTS_DIRECTORY_PATH = 'autotests' as DirectoryPathFromRoot;

/**
 * Relative (from root) path to `variables.env` file in directory with autotests.
 * @internal
 */
export const DOT_ENV_PATH = join(AUTOTESTS_DIRECTORY_PATH, 'variables.env') as FilePathFromRoot;

/**
 * Relative (from root) path to reports directory.
 * @internal
 */
export const REPORTS_DIRECTORY_PATH = join(
  AUTOTESTS_DIRECTORY_PATH,
  'reports',
) as DirectoryPathFromRoot;

/**
 * Name of internal directory with tests artifacts.
 * @internal
 */
export const INTERNAL_DIRECTORY_NAME = 'internal';

/**
 * Relative (from root) path to internal directory with tests artifacts.
 * @internal
 */
export const INTERNAL_REPORTS_DIRECTORY_PATH = join(
  REPORTS_DIRECTORY_PATH,
  INTERNAL_DIRECTORY_NAME,
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to directory with tests itself.
 * @internal
 */
export const TESTS_DIRECTORY_PATH = join(
  AUTOTESTS_DIRECTORY_PATH,
  'tests',
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to temporary directory.
 * @internal
 */
export const TMP_DIRECTORY_PATH = join(REPORTS_DIRECTORY_PATH, 'tmp') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to file with total API statistics of run.
 * @internal
 */
export const API_STATISTICS_PATH = join(
  TMP_DIRECTORY_PATH,
  'apiStatistics.txt',
) as FilePathFromRoot;

/**
 * Relative (from root) path to directory with compiled pack configuration files.
 * @internal
 */
export const COMPILED_USERLAND_CONFIG_DIRECTORY = join(
  TMP_DIRECTORY_PATH,
  'config',
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to `config` file,
 * that plays the role of the internal Playwright config.
 * @internal
 */
export const CONFIG_PATH = join(INSTALLED_E2ED_DIRECTORY_PATH, 'config.js') as FilePathFromRoot;

/**
 * Relative (from root) path to events directory.
 * @internal
 */
export const EVENTS_DIRECTORY_PATH = join(TMP_DIRECTORY_PATH, 'events') as DirectoryPathFromRoot;

/**
 * Relative (from root) path to temporary directory with expected screenshots
 * (for `toMatchScreenshot` assert).
 * @internal
 */
export const EXPECTED_SCREENSHOTS_DIRECTORY_PATH = join(
  TMP_DIRECTORY_PATH,
  'expectedScreenshots',
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to file with global errors of run.
 * @internal
 */
export const GLOBAL_ERRORS_PATH = join(TMP_DIRECTORY_PATH, 'globalErrors.txt') as FilePathFromRoot;

/**
 * Relative (from root) path to directory with tests screenshots.
 * @internal
 */
export const SCREENSHOTS_DIRECTORY_PATH = join(
  REPORTS_DIRECTORY_PATH,
  'screenshots',
) as DirectoryPathFromRoot;

/**
 * Relative (from root) path to start info JSON file.
 * @internal
 */
export const START_INFO_PATH = join(TMP_DIRECTORY_PATH, 'startInfo.json') as FilePathFromRoot;
