import {fork} from 'node:child_process';
import {join} from 'node:path';

import {INSTALLED_E2ED_DIRECTORY_PATH} from '../../constants/internal';

import {E2edError} from '../error';
import {getLastLogEventTimeInMs} from '../fs';
import {getFullPackConfig} from '../getFullPackConfig';
import {setTestsSubprocess, testsSubprocess} from '../tests';

import {killTestCafeProcessesOccupyingPorts} from './killTestCafeProcessesOccupyingPorts';

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
  new Promise<void>((resolve, reject) => {
    if (testsSubprocess?.killed === false) {
      testsSubprocess.kill();
    }

    const {runLabel} = runRetryOptions;
    const newTestsSubprocess = fork(pathToRunTestsSubprocess);
    let timeoutId: NodeJS.Timer;

    setTestsSubprocess(newTestsSubprocess);

    newTestsSubprocess.on('error', reject);
    newTestsSubprocess.on('exit', (exitCode) => {
      const error = new E2edError(
        `Retry subprocess with label "${runLabel}" exit with non-zero exit code ${String(
          exitCode,
        )}`,
      );

      clearTimeout(timeoutId);

      return exitCode === 0 ? resolve() : reject(error);
    });

    newTestsSubprocess.send(runRetryOptions);

    const {testIdleTimeout} = getFullPackConfig();
    const interruptTimeout = 2 * testIdleTimeout;
    const killByTimeout = (): void => {
      if (!newTestsSubprocess.killed) {
        newTestsSubprocess.kill();
      }

      const error = new E2edError(
        `Retry subprocess with label "${runLabel}" did not respond within ${interruptTimeout}ms and was killed`,
      );

      reject(error);
    };
    const resetInterruptTimeout = (): void => {
      clearTimeout(timeoutId);

      void getLastLogEventTimeInMs().then((lastLogEventTimeInMs) => {
        if (lastLogEventTimeInMs > 0 && Date.now() - lastLogEventTimeInMs > interruptTimeout) {
          killByTimeout();
        }
      });

      timeoutId = setTimeout(killByTimeout, interruptTimeout);
    };

    resetInterruptTimeout();

    newTestsSubprocess.on('message', resetInterruptTimeout);
  }).finally(killTestCafeProcessesOccupyingPorts);
