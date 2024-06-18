import {fork} from 'node:child_process';

import {CONFIG_PATH, e2edEnvironment} from '../../constants/internal';

import {getFullPackConfig} from '../config';
import {getRunLabel, setRunLabel} from '../environment';
import {E2edError} from '../error';
import {generalLog, setSuccessfulTotalInPreviousRetries} from '../generalLog';
import {setVisitedTestNamesHash} from '../globalState';
import {startResourceUsageReading} from '../resourceUsage';

import {beforeRunFirstTest} from './beforeRunFirstTest';

import type {RunRetryOptions} from '../../types/internal';

/**
 * Runs tests (via TestCafe JavaScript API, for running one retry in docker).
 * Rejects, if there are some failed tests.
 * @internal
 */
export const runTests = async ({
  runLabel,
  successfulTestRunNamesHash,
  visitedTestNamesHash,
}: RunRetryOptions): Promise<void> => {
  setRunLabel(runLabel);
  setVisitedTestNamesHash(visitedTestNamesHash);

  try {
    const successfulTotalInPreviousRetries = Object.keys(successfulTestRunNamesHash).length;

    setSuccessfulTotalInPreviousRetries(successfulTotalInPreviousRetries);

    const {browserInitTimeout, resourceUsageReadingInternal} = getFullPackConfig();

    startResourceUsageReading(resourceUsageReadingInternal);

    let beforeRunFirstTestWasCalled = false;

    const beforeRunFirstTestTimeoutId = setTimeout(() => {
      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }
    }, browserInitTimeout);

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
        playwrightArgs.push('--debug');
      }

      if (!beforeRunFirstTestWasCalled) {
        beforeRunFirstTestWasCalled = true;

        beforeRunFirstTest();
      }

      const playwrightProcess = fork(
        '/node_modules/e2ed/node_modules/@playwright/test/cli.js',
        playwrightArgs,
      );

      playwrightProcess.stdout?.on('data', (data) => {
        const stringData = String(data).trim();

        if (stringData !== '') {
          generalLog(stringData);
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
