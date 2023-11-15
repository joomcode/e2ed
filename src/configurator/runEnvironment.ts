import {e2edEnvironment, RUN_ENVIRONMENT_VARIABLE_NAME} from '../constants/internal';

import {RunEnvironment} from './constants';

/**
 * Run environment for current e2ed run.
 */
// eslint-disable-next-line import/no-mutable-exports
export let runEnvironment = e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] ?? RunEnvironment.Local;

/**
 * Set current run environment before e2ed start.
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;
  e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};
