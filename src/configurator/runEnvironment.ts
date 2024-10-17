/* eslint-disable import/no-mutable-exports */

import {e2edEnvironment, RUN_ENVIRONMENT_VARIABLE_NAME} from '../constants/internal';

import {RunEnvironment} from './constants';

/**
 * Run environment for current e2ed run.
 */
export let runEnvironment: RunEnvironment =
  e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] ?? RunEnvironment.Local;

/**
 * `true`, if run e2ed in docker environment, and `false` otherwise.
 */
export let isDockerRun: boolean = runEnvironment === RunEnvironment.Docker;

/**
 * `true`, if run e2ed in local environment, and `false` otherwise.
 */
export let isLocalRun: boolean = runEnvironment === RunEnvironment.Local;

/**
 * Set current run environment before e2ed start.
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;

  isLocalRun = runEnvironment === RunEnvironment.Local;
  isDockerRun = runEnvironment === RunEnvironment.Docker;

  e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};
