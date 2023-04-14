import {
  e2edEnvironment,
  RUN_ENVIRONMENT_VARIABLE_NAME,
  START_TIME_IN_MS_VARIABLE_NAME,
} from './constants/internal';

import type {UtcTimeInMs} from './types/internal';

/**
 * e2ed start time (UTC, in milliseconds).
 */
const startTimeInMs = (Number(e2edEnvironment[START_TIME_IN_MS_VARIABLE_NAME]) ||
  Date.now()) as UtcTimeInMs;

e2edEnvironment[START_TIME_IN_MS_VARIABLE_NAME] = String(startTimeInMs);

// eslint-disable-next-line import/no-unused-modules
export type {UserlandPack as PackConfig} from './types/internal';

/**
 * Run environment enum (run in docker or local run).
 */
export const enum RunEnvironment {
  Docker = 'docker',
  Local = 'local',
}

/**
 * Run environment for current e2ed run.
 */
// eslint-disable-next-line import/no-mutable-exports
export let runEnvironment = e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] ?? RunEnvironment.Local;

/**
 * Set current run environment before e2ed start.
 * @internal
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;
  e2edEnvironment[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};

export {startTimeInMs};
