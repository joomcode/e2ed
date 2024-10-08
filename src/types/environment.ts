import type {RunEnvironment} from '../configurator';
import type {
  PATH_TO_PACK_VARIABLE_NAME,
  PATH_TO_TEST_FILE_VARIABLE_NAME,
  RUN_ENVIRONMENT_VARIABLE_NAME,
  RUN_LABEL_VARIABLE_NAME,
  START_TIME_IN_MS_VARIABLE_NAME,
  UI_MODE_VARIABLE_NAME,
} from '../constants/internal';

import type {RunLabel} from './runLabel';

/**
 * Environment variables for e2ed run.
 * @internal
 */
export type E2edEnvironment = {
  [key: string]: string | undefined;
  ['E2ED_DEBUG']?: string;
  ['E2ED_ORIGIN']?: string;
  ['E2ED_PATH_TO_TS_CONFIG_OF_PROJECT_FROM_ROOT']?: string;
  ['E2ED_TERMINATION_SIGNAL']?: NodeJS.Signals;
  [PATH_TO_PACK_VARIABLE_NAME]?: string;
  [PATH_TO_TEST_FILE_VARIABLE_NAME]?: string;
  ['PWD']?: string;
  ['PWDEBUG']?: 'console';
  [RUN_ENVIRONMENT_VARIABLE_NAME]?: RunEnvironment;
  [RUN_LABEL_VARIABLE_NAME]?: RunLabel;
  [START_TIME_IN_MS_VARIABLE_NAME]?: string;
  [UI_MODE_VARIABLE_NAME]?: 'true';
};
