import createTestCafe from 'testcafe';

import {getIntegerFromEnvVariable} from './getIntegerFromEnvVariable';

import type {FailTest} from './getFailedTestsFromJsonReport';

const browsers = ['chromium:headless --no-sandbox --disable-dev-shm-usage'];

const concurrency = getIntegerFromEnvVariable({
  defaultValue: 5,
  maxValue: 50,
  name: 'E2ED_CONCURRENCY',
});

type RunOptions = Readonly<{
  isFirstRetry: boolean;
  runLabel: string;
  tests: FailTest[];
}>;

/**
 * Runs one retry of tests.
 * @internal
 */
export const runTests = async ({isFirstRetry, runLabel, tests}: RunOptions): Promise<void> => {
  process.env.E2ED_RUN_LABEL = runLabel;

  // @ts-expect-error: createTestCafe has wrong argument types
  const testCafe = await createTestCafe({
    browsers,
    configFile: './node_modules/e2ed/testcaferc.json',
  });

  try {
    const runner = testCafe.createRunner();

    await runner
      .browsers(browsers)
      .concurrency(concurrency)
      .filter((testName, fixtureName, fixturePath) => {
        if (isFirstRetry) {
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
    // eslint-disable-next-line no-console
    console.log(`Caught an error when running tests with label "${runLabel}": ${String(error)}`);
  } finally {
    await testCafe.close();
  }
};
