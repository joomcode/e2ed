import createTestCafe from 'testcafe';

import {generalLog} from './generalLog';

import type {FailTest} from './getFailedTestsFromJsonReport';

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

  let testCafe: globalThis.TestCafe | undefined;

  try {
    // @ts-expect-error: createTestCafe has wrong argument types
    testCafe = await createTestCafe({
      browsers,
      configFile: './node_modules/e2ed/testcaferc.json',
    });

    const runner = testCafe.createRunner();

    await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName, fixtureName, fixturePath) => {
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
  } catch (error: unknown) {
    generalLog(`Caught an error when running tests with label "${runLabel}": ${String(error)}`);
  } finally {
    await testCafe?.close();
    process.exit(0);
  }
};
