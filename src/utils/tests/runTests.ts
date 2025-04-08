import {fork} from 'node:child_process';

import {isLocalRun} from '../../configurator';
import {CONFIG_PATH, e2edEnvironment, IS_DEBUG} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {getRunLabel, setRunLabel} from '../environment';
import {generalLog} from '../generalLog';
import {startResourceUsageReading} from '../resourceUsage';
import {isUiMode} from '../uiMode';

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
    const {testIdleTimeout, resourceUsageReadingInternal} = getFullPackConfig();

    startResourceUsageReading(resourceUsageReadingInternal);

    let beforeRunFirstTestWasCalled = false;

    const beforeRunFirstTestTimeoutId = setTimeout(() => {
      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }
    }, testIdleTimeout);

    beforeRunFirstTestTimeoutId.unref();

    await new Promise<void>((resolve, reject) => {
      const playwrightArgs = ['test', `--config=${CONFIG_PATH}`];

      if (IS_DEBUG && isLocalRun) {
        e2edEnvironment.PWDEBUG = 'console';
        playwrightArgs.push('--debug');
      }

      if (isUiMode) {
        playwrightArgs.push('--ui');
      }

      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }

      const playwrightProcess = fork(playwrightCliPath, playwrightArgs, {
        execArgv: [],
        stdio: 'pipe',
      });

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

      playwrightProcess.on('exit', (exitCode, exitSignal): void => {
        const signalMessage = exitSignal === null ? '' : ` and signal ${exitSignal}`;

        generalLog(
          `Playwright process with label "${runLabel}" exit with code ${String(exitCode)}${signalMessage}`,
        );

        resolve();
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
