import {fork} from 'node:child_process';

import {CONFIG_PATH, e2edEnvironment} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {getRunLabel, setRunLabel} from '../environment';
import {E2edError} from '../error';
import {generalLog} from '../generalLog';
import {startResourceUsageReading} from '../resourceUsage';

import {beforeRunFirstTest} from './beforeRunFirstTest';
import {stripExtraLogs} from './stripExtraLogs';

import type {RunRetryOptions} from '../../types/internal';

const playwrightCliPath = require.resolve('@playwright/test').replace('index.js', 'cli.js');

/**
 * Runs tests via Playwright internal CLI module.
 * Rejects, if there are some failed tests.
 * @internal
 */
export const runTests = async ({runLabel}: RunRetryOptions): Promise<void> => {
  setRunLabel(runLabel);

  try {
    const {enableLiveMode, testIdleTimeout, resourceUsageReadingInternal} = getFullPackConfig();

    startResourceUsageReading(resourceUsageReadingInternal);

    let beforeRunFirstTestWasCalled = false;

    const beforeRunFirstTestTimeoutId = setTimeout(() => {
      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }
    }, testIdleTimeout);

    beforeRunFirstTestTimeoutId.unref();

    // const notIncludedInPackTests = await getNotIncludedInPackTests();
    // const notIncludedInPackTestsInAbsolutePaths = notIncludedInPackTests.map((testFilePath) =>
    //  join(ABSOLUTE_PATH_TO_PROJECT_ROOT_DIRECTORY, testFilePath),
    // );

    await new Promise<void>((resolve, reject) => {
      const playwrightArgs = ['test', '--config', CONFIG_PATH];

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (e2edEnvironment.E2ED_DEBUG) {
        // playwrightArgs.unshift('--node-options=--inspect-brk');
        e2edEnvironment.PWDEBUG = 'console';
        playwrightArgs.push('--debug');
      }

      if (enableLiveMode) {
        playwrightArgs.push('--ui');
      }

      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }

      const playwrightProcess = fork(playwrightCliPath, playwrightArgs, {stdio: 'pipe'});

      playwrightProcess.stdout?.on('data', (data) => {
        const stringData = stripExtraLogs(String(data).trim()).trim();

        if (stringData !== '') {
          if (stringData.startsWith('[e2ed]')) {
            // eslint-disable-next-line no-console
            console.log(stringData);
          } else {
            generalLog(stringData);
          }
        }
      });
      playwrightProcess.stderr?.on('data', (data) => generalLog(`Error: ${String(data)}`));

      playwrightProcess.on('error', reject);

      playwrightProcess.on('exit', (exitCode): void => {
        const error = new E2edError(
          `Playwright process with label "${runLabel}" exit with non-zero exit code ${String(
            exitCode,
          )}`,
        );

        return exitCode === 0 ? resolve() : reject(error);
      });
    });
  } catch (error) {
    const currentRunLabel = getRunLabel();

    generalLog(`Caught an error when running tests in retry with label "${currentRunLabel}"`, {
      error,
    });

    throw error;
  }
};
