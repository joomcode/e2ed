import {createTestCafe} from '../testcafe';

import {E2EDError} from './E2EDError';
import {generalLog} from './generalLog';
import {getFullConfig} from './getFullConfig';

import type {Inner} from 'testcafe-without-typecheck';

import type {E2edEnvironment, TestCafeRunOptions} from '../types/internal';

/**
 * Runs TestCafe via JavaScript API (for running one retry in docker).
 * Rejects, if there are some failed tests.
 */
export const runTestCafe = async ({
  concurrency,
  runLabel,
  tests,
}: TestCafeRunOptions): Promise<void> => {
  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  let maybeTestCafe: Inner.TestCafe | undefined;

  try {
    const {browsers: browsersAsStringOrArray} = getFullConfig();
    const browsers = Array.isArray(browsersAsStringOrArray)
      ? (browsersAsStringOrArray as string[])
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
      .filter((testName: string, fixtureName: string, fixturePath: string) => {
        if (tests.length === 0) {
          return true;
        }

        return tests.some(
          (test) =>
            test.testName === testName &&
            test.fixtureName === fixtureName &&
            test.fixturePath === fixturePath,
        );
      })
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
