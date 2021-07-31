import {fork} from 'child_process';

import type {RunOptions} from '../bin/runTestCafeSubprocess';

/**
 * Runs one retry of tests.
 * @internal
 */
export const runTests = (runOptions: RunOptions): Promise<void> =>
  new Promise((resolve) => {
    const testCafeSubprocess = fork('./node_modules/e2ed/bin/runTestCafeSubprocess.js');

    testCafeSubprocess.on('close', resolve);

    testCafeSubprocess.send(runOptions);
  });
