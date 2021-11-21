import createTestCafe from 'testcafe-without-typecheck';

import {generalLog} from './generalLog';

import type {FailTest} from '../types/internal';
import type {Inner} from 'testcafe-without-typecheck';

const browsers = ['chromium:headless --no-sandbox --disable-dev-shm-usage'];

/**
 * Options for running one retry of tests.
 * @internal
 */
export type RunOptions = Readonly<{
  concurrency: number;
  runLabel: string;
  tests: FailTest[];
}>;

/**
 * Runs TestCafe via JavaScript API.
 */
export const runTestCafe = async ({concurrency, runLabel, tests}: RunOptions): Promise<void> => {
  process.env.E2ED_RUN_LABEL = runLabel;

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
          return Promise.resolve(true);
        }

        return Promise.resolve(
          tests.some(
            (test) =>
              test.testName === testName &&
              test.fixtureName === fixtureName &&
              test.fixturePath === fixturePath,
          ),
        );
      })
      .run();
  } catch (error: unknown) {
    generalLog(`Caught an error when running tests with label "${runLabel}": ${String(error)}`);
  } finally {
    await maybeTestCafe?.close();
    process.exit(0);
  }
};
