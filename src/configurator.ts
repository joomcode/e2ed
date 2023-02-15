// eslint-disable-next-line import/no-internal-modules
import type {UtcTimeInMs} from './types/date';

const START_TIME_VARIABLE_NAME = '__INTERNAL_E2ED_START_TIME';
const RUN_ENVIRONMENT_VARIABLE_NAME = '__INTERNAL_E2ED_RUN_ENVIRONMENT';

/**
 * e2ed start time (UTC, in milliseconds).
 */
const startTimeInMs = (Number(process.env[START_TIME_VARIABLE_NAME]) || Date.now()) as UtcTimeInMs;

process.env[START_TIME_VARIABLE_NAME] = String(startTimeInMs);

// eslint-disable-next-line import/no-internal-modules, import/no-unused-modules
export type {UserlandConfig as PackConfig} from './types/config';

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
export let runEnvironment = (process.env[RUN_ENVIRONMENT_VARIABLE_NAME] ??
  RunEnvironment.Local) as RunEnvironment;

/**
 * Sets current run environment before e2ed start.
 * @internal
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;
  process.env[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};

export {startTimeInMs};
