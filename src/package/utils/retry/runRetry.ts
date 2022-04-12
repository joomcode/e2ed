import {fork} from 'node:child_process';

import type {TestCafeRunOptions} from '../../types/internal';

/**
 * Run one retry of remaining tests.
 * @internal
 */
export const runRetry = (runOptions: TestCafeRunOptions): Promise<void> =>
  new Promise((resolve) => {
    const testCafeSubprocess = fork('./node_modules/e2ed/bin/runTestCafeSubprocess.js');

    testCafeSubprocess.on('close', resolve);

    testCafeSubprocess.send(runOptions);
  });
