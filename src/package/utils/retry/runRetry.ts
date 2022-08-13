import {fork} from 'node:child_process';

import type {TestCafeRunOptions} from '../../types/internal';

/**
 * Run one retry of remaining tests.
 * @internal
 */
export const runRetry = (runOptions: TestCafeRunOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    const testCafeSubprocess = fork('./node_modules/e2ed/bin/runTestCafeSubprocess.js');

    testCafeSubprocess.on('error', reject);
    testCafeSubprocess.on('exit', (exitCode) => (exitCode === 0 ? resolve() : reject()));

    testCafeSubprocess.send(runOptions);
  });
