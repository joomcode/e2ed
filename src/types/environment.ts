import type {RunEnvironment} from '../configurator';
import type {
  PATH_TO_PACK_VARIABLE_NAME,
  RUN_ENVIRONMENT_VARIABLE_NAME,
  RUN_LABEL_VARIABLE_NAME,
  START_TIME_IN_MS_VARIABLE_NAME,
} from '../constants/internal';

import type {RunLabel} from './runLabel';

/**
 * Environment variables for e2ed run.
 * @internal
 */
export type E2edEnvironment = {
  E2ED_DEBUG?: string;
  PWD?: string;
  [PATH_TO_PACK_VARIABLE_NAME]?: string;
  [RUN_ENVIRONMENT_VARIABLE_NAME]?: RunEnvironment;
  [RUN_LABEL_VARIABLE_NAME]?: RunLabel;
  [START_TIME_IN_MS_VARIABLE_NAME]?: string;
  [key: string]: string | undefined;
};
