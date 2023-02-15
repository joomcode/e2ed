import {e2edEnvironment, TESTCAFERC_PATH} from '../../constants/internal';
import {createTestCafe} from '../../testcafe';

import {E2edError} from '../error';
import {generalLog} from '../generalLog';
import {getFullPackConfig} from '../getFullPackConfig';

import type {Inner} from 'testcafe-without-typecheck';

import type {RunRetryOptions} from '../../types/internal';

/**
 * Runs tests (via TestCafe JavaScript API, for running one retry in docker).
 * Rejects, if there are some failed tests.
 * @internal
 */
export const runTests = async ({
  concurrency,
  runLabel,
  successfulTestRunNamesHash,
}: RunRetryOptions): Promise<void> => {
  e2edEnvironment.E2ED_RUN_LABEL = runLabel;

  let maybeTestCafe: Inner.TestCafe | undefined;

  try {
    const {browser} = getFullPackConfig();
    const browsers = [browser];

    const testCafe = await createTestCafe({browsers, configFile: TESTCAFERC_PATH});

    maybeTestCafe = testCafe;

    const runner = testCafe.createRunner();

    const failedTestsCount = await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName: string) => !successfulTestRunNamesHash[testName])
      .run();

    if (failedTestsCount !== 0) {
      throw new E2edError(`Got ${failedTestsCount} failed tests in retry with label "${runLabel}"`);
    }
  } catch (error) {
    generalLog(`Caught an error when running tests in retry with label "${runLabel}"`, {error});

    throw error;
  } finally {
    await maybeTestCafe?.close();
  }
};
