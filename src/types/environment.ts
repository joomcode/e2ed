import type {PATH_TO_PACK_VARIABLE_NAME} from '../constants/internal';

import type {RunLabel} from './runLabel';

/**
 * Environment variables for e2ed.
 * @internal
 */
export type E2edEnvironment = {
  E2ED_DEBUG?: string;
  E2ED_RUN_LABEL?: RunLabel;
  PWD?: string;
  [PATH_TO_PACK_VARIABLE_NAME]?: string;
  [key: string]: string | undefined;
};
