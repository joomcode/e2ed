import {createTestCafe} from '../testcafe';

import {generalLog} from './generalLog';

import type {Inner} from 'testcafe-without-typecheck';

import type {E2edEnvironment, TestCafeRunOptions} from '../types/internal';

const browsers = ['chromium:headless --no-sandbox --disable-dev-shm-usage'];

/**
 * Runs TestCafe via JavaScript API.
 */
export const runTestCafe = async ({
  concurrency,
  runLabel,
  tests,
}: TestCafeRunOptions): Promise<void> => {
  (process.env as E2edEnvironment).E2ED_RUN_LABEL = runLabel;

  let maybeTestCafe: Inner.TestCafe | undefined;

  try {
    const testCafe = await createTestCafe({
      browsers,
      configFile: './node_modules/e2ed/testcaferc.js',
    });

    maybeTestCafe = testCafe;

    const runner = testCafe.createRunner();

    await runner
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
  } catch (error) {
    generalLog(`Caught an error when running tests with label "${runLabel}": ${String(error)}`);
  } finally {
    await maybeTestCafe?.close();
  }
};
