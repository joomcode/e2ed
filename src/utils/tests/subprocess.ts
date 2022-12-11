import type {ChildProcess} from 'node:child_process';

/**
 * Tests subprocess (for running tests in one retry).
 * @internal
 */
// eslint-disable-next-line import/no-mutable-exports
export let testsSubprocess: ChildProcess | undefined;

/**
 * Set tests subprocess (for global access).
 * @internal
 */
export const setTestsSubprocess = (newTestsSubprocess: ChildProcess): void => {
  testsSubprocess = newTestsSubprocess;
};
