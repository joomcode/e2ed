import type {RunLabel} from './runLabel';

/**
 * Environment variables for e2ed.
 */
export type E2edEnvironment = {
  E2ED_DEBUG?: string;
  E2ED_RUN_LABEL?: RunLabel;
  PWD?: string;
};
