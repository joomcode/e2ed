import type {E2edEnvironment} from '../types/internal';

/**
 * Object with environment variables of e2ed run.
 * @internal
 */
export const e2edEnvironment = process.env as E2edEnvironment;

/**
 * `true` if e2ed run in debug mode, and `false` otherwise.
 */
export const isDebug = Boolean(e2edEnvironment.E2ED_DEBUG);

/**
 * Name of e2ed environment variable with path to pack.
 * @internal
 */
export const PATH_TO_PACK_VARIABLE_NAME = '__INTERNAL_E2ED_PATH_TO_PACK';

/**
 * Name of e2ed environment variable with path to one test file.
 * @internal
 */
export const PATH_TO_TEST_FILE_VARIABLE_NAME = '__INTERNAL_E2ED_PATH_TO_TEST_FILE';

/**
 * Name of e2ed environment variable with run environment.
 * @internal
 */
export const RUN_ENVIRONMENT_VARIABLE_NAME = '__INTERNAL_E2ED_RUN_ENVIRONMENT';

/**
 * Run environment enum (run in docker or local run).
 */
export const enum RunEnvironment {
  Docker = 'docker',
  Local = 'local',
}

/**
 * Name of e2ed environment variable for run label.
 * @internal
 */
export const RUN_LABEL_VARIABLE_NAME = '__INTERNAL_E2ED_RUN_LABEL';

/**
 * Name of e2ed environment variable with start e2ed time (in UtcTimeInMs).
 * @internal
 */
export const START_TIME_IN_MS_VARIABLE_NAME = '__INTERNAL_E2ED_START_TIME_IN_MS';

/**
 * Name of e2ed environment variable for UI-mode flag.
 * @internal
 */
export const UI_MODE_VARIABLE_NAME = '__INTERNAL_E2ED_UI_MODE';
