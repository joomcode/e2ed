import {createTestCafe} from '../testcafe';

import {E2EDError} from './E2EDError';
import {generalLog} from './generalLog';
import {getFullConfig} from './getFullConfig';
import {isArray} from './typeGuards';

import type {Inner} from 'testcafe-without-typecheck';

import type {E2edEnvironment, RunRetryOptions} from '../types/internal';

/**
 * Runs TestCafe via JavaScript API (for running one retry in docker).
 * Rejects, if there are some failed tests.
 */
export const runTestCafe = async ({
  concurrency,
  runLabel,
  successfulTestRunNamesHash,
}: RunRetryOptions): Promise<void> => {
  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  let maybeTestCafe: Inner.TestCafe | undefined;

  try {
    const {browsers: browsersAsStringOrArray} = getFullConfig();
    const browsers = isArray<string>(browsersAsStringOrArray)
      ? browsersAsStringOrArray
      : [browsersAsStringOrArray as string];

    const testCafe = await createTestCafe({
      browsers,
      configFile: './node_modules/e2ed/testcaferc.js',
    });

    maybeTestCafe = testCafe;

    const runner = testCafe.createRunner();

    const failedTestsCount = await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName: string) => !successfulTestRunNamesHash[testName])
      .run();

    if (failedTestsCount !== 0) {
      throw new E2EDError(`Got ${failedTestsCount} failed tests in retry with label "${runLabel}"`);
    }
  } catch (error) {
    generalLog(`Caught an error when running tests in retry with label "${runLabel}"`, {error});

    throw error;
  } finally {
    await maybeTestCafe?.close();
  }
};
