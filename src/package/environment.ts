const RUN_ENVIRONMENT_VARIABLE_NAME = '__INTERNAL_E2ED_RUN_ENVIRONMENT';

/**
 * Run environment enum (run in docker or local run).
 */
export enum RunEnvironment {
  Docker = 'docker',
  Local = 'local',
}

/**
 * Run environment for current e2ed run.
 */
// eslint-disable-next-line import/no-mutable-exports
export let runEnvironment: RunEnvironment =
  (process.env[RUN_ENVIRONMENT_VARIABLE_NAME] as RunEnvironment) || RunEnvironment.Local;

/**
 * Sets current run environment before e2ed start.
 * @internal
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;
  process.env[RUN_ENVIRONMENT_VARIABLE_NAME] = newRunEnvironment;
};
