import {fork} from 'node:child_process';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH} from '../../constants/internal';

import {E2edError} from '../error';
import {setTestsSubprocess, testsSubprocess} from '../tests';

import type {RunRetryOptions} from '../../types/internal';

const pathToRunTestsSubprocess = join(
  INSTALLED_E2ED_DIRECTORY_PATH,
  'bin',
  'runTestsSubprocess.js',
);

/**
 * Run one retry of remaining tests.
 * @internal
 */
export const runRetry = (runRetryOptions: RunRetryOptions): Promise<void> =>
  new Promise((resolve, reject) => {
    if (testsSubprocess?.killed === false) {
      testsSubprocess.kill();
    }

    const newTestsSubprocess = fork(pathToRunTestsSubprocess);

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
