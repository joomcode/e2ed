/* eslint-disable import/no-mutable-exports */

import {e2edEnvironment, RUN_ENVIRONMENT_VARIABLE_NAME} from '../constants/internal';

import {RunEnvironment} from './constants';

/**
 * Run environment for current e2ed run.
 */
export let runEnvironment = e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] ?? RunEnvironment.Local;

/**
 * `true`, if run e2ed in local environment, and `false` otherwise.
 */
export let isLocalRun = runEnvironment === RunEnvironment.Local;

/**
 * `true`, if run e2ed in docker environment, and `false` otherwise.
 */
export let isDockerRun = runEnvironment === RunEnvironment.Docker;

/**
 * Set current run environment before e2ed start.
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;

  isLocalRun = runEnvironment === RunEnvironment.Local;
  isDockerRun = runEnvironment === RunEnvironment.Docker;

  e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};
