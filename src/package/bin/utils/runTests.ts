import createTestCafe from 'testcafe';

import type {FailTest} from './getFailedTestsFromJsonReport';

process.env.E2ED_SHOW_LOGS = 'true';

const browsers = ['chromium:headless --no-sandbox --disable-dev-shm-usage'];
const concurrencyFromEnv = Number(process.env.E2ED_DOCKER_CONCURRENCY);
const isConcurrencyFromEnvValid =
  Number.isInteger(concurrencyFromEnv) && concurrencyFromEnv > 0 && concurrencyFromEnv < 50;
const concurrency = isConcurrencyFromEnvValid ? concurrencyFromEnv : 5;

if (process.env.E2ED_DOCKER_CONCURRENCY !== undefined && isConcurrencyFromEnvValid === false) {
  console.log(
    `Invalid value for environment variable E2ED_DOCKER_CONCURRENCY (it must be less than 50): ${process.env.E2ED_DOCKER_CONCURRENCY}. Instead, use the default value ${concurrency}`,
  );
}

type RunOptions = Readonly<{
  isFirstRetry: boolean;
  runLabel: string;
  tests: FailTest[];
}>;

/**
 * Run one retry of tests.
 * @internal
 */
export const runTests = async ({isFirstRetry, runLabel, tests}: RunOptions): Promise<void> => {
  process.env.E2ED_RUN_LABEL = runLabel;

  const testCafe = await createTestCafe();

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
    console.log(`Caught an error when running tests with label "${runLabel}": ${String(error)}`);
  } finally {
    await testCafe.close();
  }
};
