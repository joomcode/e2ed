import {fork} from 'node:child_process';

import {E2edError} from '../E2edError';
import {setTestsSubprocess, testsSubprocess} from '../tests';

import type {RunRetryOptions} from '../../types/internal';

/**
 * Run one retry of remaining tests.
 * @internal
 */
export const runRetry = (runRetryOptions: RunRetryOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    if (testsSubprocess?.killed === false) {
      testsSubprocess.kill();
    }

    const newTestsSubprocess = fork('./node_modules/e2ed/bin/runTestsSubprocess.js');

    setTestsSubprocess(newTestsSubprocess);

    newTestsSubprocess.on('error', reject);
    newTestsSubprocess.on('exit', (exitCode) => {
      const error = new E2edError(
        `Retry subprocess exit with non-zero exit code ${String(exitCode)}`,
      );

      return exitCode === 0 ? resolve() : reject(error);
    });

    newTestsSubprocess.send(runRetryOptions);
  });
