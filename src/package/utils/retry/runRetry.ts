import {fork} from 'node:child_process';

import {E2EDError} from '../E2EDError';

import type {RunRetryOptions} from '../../types/internal';

/**
 * Run one retry of remaining tests.
 * @internal
 */
export const runRetry = (runRetryOptions: RunRetryOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    const testCafeSubprocess = fork('./node_modules/e2ed/bin/runTestCafeSubprocess.js');

    testCafeSubprocess.on('error', reject);
    testCafeSubprocess.on('exit', (exitCode) => {
      const error = new E2EDError(
        `Retry subprocess exit with non-zero exit code ${String(exitCode)}`,
      );

      return exitCode === 0 ? resolve() : reject(error);
    });

    testCafeSubprocess.send(runRetryOptions);
  });
