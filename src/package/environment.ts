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
export let runEnvironment: RunEnvironment = RunEnvironment.Local;

/**
 * Sets current run environment before e2ed start.
 * @internal
 */
export const setRunEnvironment = (newRunEnvironment: RunEnvironment): void => {
  runEnvironment = newRunEnvironment;
};
